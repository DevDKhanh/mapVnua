import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColorDto, SearchColorsDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color } from './entities/color.entity';
import { createPagination, resultData } from 'src/common/text.helper';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { GetListDto } from 'src/common/dto/index.dto';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
    private readonly i18n: I18nRequestScopeService,
  ) {}

  async create(createColorDto: CreateColorDto) {
    const colorCheck = await this.colorRepository.findOne({
      where: {
        code: createColorDto.code,
      },
    });

    if (!!colorCheck) {
      throw new HttpException(
        await this.i18n.translate('site.IS_EXISTS', {
          args: { name: 'mã màu' },
        }),
        HttpStatus.BAD_REQUEST,
      );
    }

    const color = this.colorRepository.create(createColorDto);
    const save = await this.colorRepository.save(color);

    return resultData(await this.i18n.translate('site.SUCCESS_CREATE'), save);
  }

  async findAll(getListDto: GetListDto) {
    const listPage = await this.colorRepository.findAndCount({
      take: getListDto.pageSize,
      skip: (getListDto.page - 1) * getListDto.pageSize,
      order: {
        createdAt: 'DESC',
      },
    });
    return createPagination(
      listPage[0],
      listPage[1],
      getListDto.page,
      getListDto.pageSize,
    );
  }

  async findOne(id: number) {
    const color = await this.colorRepository.findOne(id);
    if (!color) {
      throw new NotFoundException(`Color with ID ${id} not found`);
    }

    return resultData(
      await this.i18n.translate('site.DETAIL_DATA', {
        args: { name: 'mã màu' },
      }),
      color,
    );
  }

  async update(id: number, updateColorDto: UpdateColorDto) {
    const existingColor = await this.colorRepository.findOne(id);
    const updatedColor = this.colorRepository.merge(
      existingColor,
      updateColorDto,
    );

    return resultData(await this.i18n.translate('site.SUCCESS_UPDATE'), {
      ...(await this.colorRepository.save(updatedColor)),
    });
  }

  async remove(id: number) {
    try {
      const color = await this.colorRepository.findOne(id);

      if (!color) {
        throw new HttpException(
          await this.i18n.translate('site.IS_NOT_EXISTS', {
            args: { name: 'mã màu' },
          }),
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.colorRepository.remove(color);
      return resultData(await this.i18n.translate('site.SUCCESS_DELETE'), id);
    } catch (err) {
      return new HttpException(
        await this.i18n.translate('site.FAILED_DELETE'),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async searchColors(body: SearchColorsDto) {
    function rgbToHex(red: number, green: number, blue: number): string {
      const componentToHex = (c: number): string => {
        const hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };

      const hexRed = componentToHex(red);
      const hexGreen = componentToHex(green);
      const hexBlue = componentToHex(blue);

      return `#${hexRed}${hexGreen}${hexBlue}`;
    }

    const updatedColors = await Promise.all(
      body.data.map(async x => {
        const color = await this.colorRepository.findOne({
          where: {
            code: x.value,
          },
        });

        if (color) {
          return {
            ...x,
            color: rgbToHex(color.red, color.green, color.blue),
            note: color.description,
          };
        }

        return { ...x };
      }),
    );

    return resultData('Data', updatedColors);
  }
}
