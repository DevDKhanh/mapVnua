import clsx from 'clsx';
import {ArrowLeft2, ArrowRight2} from 'iconsax-react';
import {memo, useMemo} from 'react';
import style from './Pagination.module.scss';

interface props {
	pageSize: number;
	pageCurrent: number;
	totalItem: number;
	onSetPage: (page: number) => void;
	onSetPageSize: (page: number) => void;
}

function Pagination({
	pageSize,
	pageCurrent,
	totalItem,
	onSetPage,
	onSetPageSize,
}: props) {
	const totalPage: number = useMemo(() => {
		return Math.ceil(totalItem / pageSize);
	}, [pageSize, totalItem]);

	function prev() {
		if (pageCurrent > 1) {
			onSetPage(pageCurrent - 1);
		}
	}
	function next() {
		if (pageCurrent < totalPage) {
			onSetPage(pageCurrent + 1);
		}
	}

	return (
		<div>
			<div className={style.tfoot}>
				<div className={clsx(style.limit_info, style.expan)}>
					<div className={style.limit}>
						<span>Hiển thị:</span>
						<select
							onChange={(e: any) => {
								onSetPageSize(e.target.value);
							}}
							defaultValue={pageSize}
						>
							<option value={10}>10</option>
							<option value={20}>20</option>
							<option value={30}>30</option>
							<option value={50}>50</option>
						</select>
					</div>
					<div className={clsx(style.info, style.expan)}>
						<span>
							{pageSize * (pageCurrent - 1) + 1}-
							{pageSize * pageCurrent} trong tổng {totalItem} kết
							quả
						</span>
					</div>
				</div>
				<div className={style.pagination}>
					<span>Tổng trang: {totalPage}</span>
					<div className={style.page}>{pageCurrent}</div>
					<div className={style.prev_next}>
						<div
							className={clsx(
								style.prev,
								pageCurrent > 1 ? style.active : ''
							)}
							onClick={prev}
						>
							<ArrowLeft2 size={16} />
						</div>
						<div
							className={clsx(
								style.next,
								pageCurrent < totalPage ? style.active : ''
							)}
							onClick={next}
						>
							<ArrowRight2 size={16} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default memo(Pagination);
