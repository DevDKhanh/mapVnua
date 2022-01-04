import Input from '../../components/Input';
import Button from '../../components/Button';
import style from './LoginPage.module.scss';

function LoginPage() {
	return (
		<main className={style.page}>
			<div className={style.mainForm}>
				<div className={style.form}>
					<h2 className={style.title}>Đăng nhập hệ thống</h2>
					<form>
						<Input className={style.input} label={'Email'} />
						<Input
							className={style.input}
							label={'Password'}
							type="password"
						/>
						<div className={style.groupBtn}>
							<Button text="Đăng nhập" maxWidth primary rounded />
						</div>
					</form>
				</div>
			</div>
		</main>
	);
}

export default LoginPage;
