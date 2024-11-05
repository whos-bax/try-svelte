<script>
	import userApi from '$lib/api/user.ts';
	import { goto } from '$app/navigation';

	let formValue = $state({
		email: '',
		password: ''
	});

	function handleFormValue(e) {
		const { value, name } = e.target;
		formValue = {
			...formValue,
			[name]: value
		};
	}

	async function handleSubmit() {
		try {
			const res = await userApi.login(formValue.email, formValue.password);
			if (res.status === 200 && res.data) {
				goto('/', { replaceState: true });
			}
		} catch (e) {
			console.log('handleSubmit - login : ', e);
		}
	}
</script>

<div
	style="width: 100%; height: 100%; padding-top: 48px; padding-bottom: 32px; padding-left: 32px; padding-right: 32px; background: white; box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.20); border-radius: 4px; overflow: hidden; flex-direction: column; justify-content: center; align-items: center; gap: 40px; display: inline-flex"
>
	<div
		style="align-self: stretch; height: 286px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 24px; display: flex"
	>
		<div
			style="align-self: stretch; height: 128px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 16px; display: flex"
		>
			<div
				style="align-self: stretch; height: 56px; flex-direction: column-reverse; justify-content: flex-start; align-items: flex-start; display: flex"
			>
				<div
					style="align-self: stretch; height: 56px; padding-left: 12px; padding-right: 12px; border-radius: 4px; border: 1px rgba(0, 0, 0, 0.23) solid; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex"
				>
					<div
						style="align-self: stretch; padding-top: 16px; padding-bottom: 16px; justify-content: flex-start; align-items: center; display: inline-flex"
					>
						<div
							style="flex: 1 1 0; color: rgba(0, 0, 0, 0.38); font-size: 16px; font-family: Noto Sans KR; font-weight: 400; line-height: 24px; word-wrap: break-word"
						>
							아이디 입력
							<input
								style="flex: 1 1 0; color: rgba(0, 0, 0, 0.38); font-size: 16px; font-family: Noto Sans KR; font-weight: 400; line-height: 24px; word-wrap: break-word"
								value={formValue.email}
								name="email"
								oninput={handleFormValue}
							/>
						</div>
					</div>
				</div>
				<div
					style="height: 2px; padding-left: 4px; padding-right: 4px; background: white; justify-content: flex-start; align-items: center; gap: 10px; display: inline-flex"
				>
					<div
						style="color: rgba(0, 0, 0, 0.60); font-size: 12px; font-family: Noto Sans KR; font-weight: 400; line-height: 12px; word-wrap: break-word"
					>
						아이디
					</div>
				</div>
			</div>
			<div
				style="align-self: stretch; height: 56px; flex-direction: column-reverse; justify-content: flex-start; align-items: flex-start; display: flex"
			>
				<div
					style="align-self: stretch; height: 56px; padding-left: 12px; padding-right: 12px; border-radius: 4px; border: 1px rgba(0, 0, 0, 0.23) solid; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex"
				>
					<div
						style="align-self: stretch; padding-top: 16px; padding-bottom: 16px; justify-content: flex-start; align-items: center; display: inline-flex"
					>
						<div
							style="flex: 1 1 0; color: rgba(0, 0, 0, 0.38); font-size: 16px; font-family: Noto Sans KR; font-weight: 400; line-height: 24px; word-wrap: break-word"
						>
							비밀번호 입력
							<input
								style="flex: 1 1 0; color: rgba(0, 0, 0, 0.38); font-size: 16px; font-family: Noto Sans KR; font-weight: 400; line-height: 24px; word-wrap: break-word"
								value={formValue.password}
								name="password"
								oninput={handleFormValue}
							/>
						</div>
					</div>
				</div>
				<div
					style="height: 2px; padding-left: 4px; padding-right: 4px; background: white; justify-content: flex-start; align-items: center; gap: 10px; display: inline-flex"
				>
					<div
						style="color: rgba(0, 0, 0, 0.60); font-size: 12px; font-family: Noto Sans KR; font-weight: 400; line-height: 12px; word-wrap: break-word"
					>
						비밀번호
					</div>
				</div>
			</div>
		</div>
		<div
			style="align-self: stretch; height: 134px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: flex"
		>
			<button
				onclick={handleSubmit}
				style="cursor: pointer; align-self: stretch; height: 42px; padding-left: 22px; padding-right: 22px; padding-top: 8px; padding-bottom: 8px; background: #212121; box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.20); border-radius: 4px; overflow: hidden; flex-direction: column; justify-content: center; align-items: center; display: flex"
			>
				<div style="justify-content: center; align-items: center; gap: 8px; display: inline-flex">
					<div
						style="color: white; font-size: 15px; font-family: Noto Sans KR; font-weight: 500; text-transform: uppercase; line-height: 26px; word-wrap: break-word"
					>
						로그인
					</div>
				</div>
			</button>
			<div
				style="align-self: stretch; height: 42px; padding-left: 22px; padding-right: 22px; padding-top: 8px; padding-bottom: 8px; border-radius: 4px; overflow: hidden; border: 1px #26A69A solid; flex-direction: column; justify-content: center; align-items: center; display: flex"
			>
				<div style="justify-content: center; align-items: center; gap: 8px; display: inline-flex">
					<div
						style="color: #00BFA5; font-size: 15px; font-family: Noto Sans KR; font-weight: 500; text-transform: uppercase; line-height: 26px; word-wrap: break-word"
					>
						회원가입
					</div>
				</div>
			</div>
			<div
				style="align-self: stretch; justify-content: flex-end; align-items: center; gap: 8px; display: inline-flex"
			>
				<div
					style="padding-left: 5px; padding-right: 5px; padding-top: 4px; padding-bottom: 4px; border-radius: 4px; overflow: hidden; flex-direction: column; justify-content: center; align-items: center; display: inline-flex"
				>
					<div style="justify-content: center; align-items: center; gap: 8px; display: inline-flex">
						<div
							style="color: rgba(0, 0, 0, 0.87); font-size: 13px; font-family: Noto Sans KR; font-weight: 500; text-transform: uppercase; line-height: 22px; word-wrap: break-word"
						>
							아이디 찾기
						</div>
					</div>
				</div>
				<div
					style="padding-left: 5px; padding-right: 5px; padding-top: 4px; padding-bottom: 4px; border-radius: 4px; overflow: hidden; flex-direction: column; justify-content: center; align-items: center; display: inline-flex"
				>
					<div style="justify-content: center; align-items: center; gap: 8px; display: inline-flex">
						<div
							style="color: rgba(0, 0, 0, 0.87); font-size: 13px; font-family: Noto Sans KR; font-weight: 500; text-transform: uppercase; line-height: 22px; word-wrap: break-word"
						>
							비밀번호 찾기
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
