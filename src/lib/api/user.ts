import axios, { AxiosError } from 'axios';
import { getCookieValue } from '$lib/api/common';

const API_BASE_URL = 'https://api.tensorcube.net';

interface UserApiResponse {
	status: number | string;
	message: string;
	data?: {
		access_token: string;
		token_type: 'bearer';
		username: string;
	};
}

async function login(email: string, password: string): Promise<UserApiResponse> {
	try {
		const response = await axios.post(
			`${API_BASE_URL}/user/login`,
			{
				username: email,
				password: password
			},
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				withCredentials: true
			}
		);
		if (response.status === 200) {
			const { access_token, username } = response.data;
			document.cookie = `jwt=${access_token}; path=/; SameSite=Lax; Secure;`;

			const nameForCookie = encodeURIComponent(username);
			document.cookie = `username=${nameForCookie}; path=/; SameSite=Lax; Secure;`;
			// localStorage.setItem('email', email);
			// localStorage.setItem('username', username);
			// // document.cookie = `email=${email}; path=/; SameSite=Lax; Secure;`;
			return {
				status: 200,
				message: 'login success',
				data: response.data
			};
		}
		return {
			status: response.status,
			message: 'Login successful but unexpected response'
		};
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError;
			if (axiosError.response) {
				switch (axiosError.response.status) {
					case 400:
						return { status: 400, message: 'Incorrect password' };
					case 404:
						return { status: 404, message: 'User not found' };
					default:
						return {
							status: axiosError.response.status,
							message: 'Login failed'
						};
				}
			}
		}
		return { status: 500, message: 'An unexpected error occurred' };
	}
}

// function logout(): UserApiResponse {
// 	document.cookie = 'jwt=; path=/; SameSite=Lax; Secure; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
// 	document.cookie = 'email=; path=/; SameSite=Lax; Secure; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
// 	return {
// 		status: 200,
// 		message: 'logout success'
// 	};
// }
//
// const registerSchema = z.object({
// 	email: z.string().email(),
// 	password: z.string().min(8),
// 	username: z.string().min(3)
// });
//
// async function register(register_form: z.infer<typeof registerSchema>): Promise<UserApiResponse> {
// 	try {
// 		const validatedData = registerSchema.parse(register_form);
// 		const response = await axios.post(`${API_BASE_URL}/user/register`, validatedData, {
// 			headers: {
// 				'Content-Type': 'application/json'
// 			},
// 			withCredentials: true
// 		});
// 		if (response.status === 201 || response.status === 200) {
// 			return {
// 				status: response.status,
// 				message: 'Registration successful'
// 			};
// 		}
// 		return {
// 			status: response.status,
// 			message: 'Registration successful but unexpected response'
// 		};
// 	} catch (error) {
// 		if (error instanceof z.ZodError) {
// 			return {
// 				status: 400,
// 				message: 'Invalid input'
// 			};
// 		}
// 		if (axios.isAxiosError(error)) {
// 			const axiosError = error as AxiosError;
// 			if (axiosError.response) {
// 				const errorMessage =
// 					typeof axiosError.response.data === 'object' && axiosError.response.data
// 						? (axiosError.response.data as any).detail || 'Registration failed'
// 						: 'Registration failed';
// 				switch (axiosError.response.status) {
// 					case 400:
// 						return { status: 400, message: errorMessage };
// 					case 404:
// 						return { status: 404, message: errorMessage || 'User not found' };
// 					case 500:
// 						return { status: 500, message: errorMessage || 'Server error' };
// 					default:
// 						return {
// 							status: axiosError.response.status,
// 							message: errorMessage
// 						};
// 				}
// 			}
// 		}
// 		return { status: 500, message: 'An unexpected error occurred' };
// 	}
// }

type UserProfileType = {
	email: string;
	username: string;
	affiliation: string | null;
};

type Subscription = {
	plan: string;
	start_date: Date;
	end_date: Date;
};

export interface GetUserResponse {
	user_profile: UserProfileType;
	subscription: Subscription;
}
async function getUser(serverToken: any): Promise<{
	status: number | string;
	message: string;
	data?: GetUserResponse;
}> {
	const token = serverToken ?? getCookieValue('jwt');
	try {
		const response = await axios.get(`${API_BASE_URL}/user/profile`, {
			withCredentials: true,
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${token}`
			}
		});
		// 성공
		if (response.status === 200) {
			return {
				status: response.status,
				message: 'success',
				data: response.data
			};
		}
		// 예상치 못한 상태 코드에 대한 처리
		return {
			status: response.status,
			message: 'Unexpected response status'
		};
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError;
			if (axiosError.response) {
				switch (axiosError.response.status) {
					case 401:
						// unauthorizedLogout();
						return { status: 401, message: 'Unauthorized' };
					default:
						return {
							status: axiosError.response.status,
							message: `Failed: ${axiosError.message}`
						};
				}
			}
		}
		return { status: 500, message: 'An unexpected error occurred' };
	}
}
//
// interface UpdateUserParam {
// 	username: string;
// 	affiliation: string;
// }
//
// async function updateUser(param: UpdateUserParam): Promise<{
// 	status: number | string;
// 	message: string;
// 	data?: UpdateUserParam;
// }> {
// 	const token = getCookieValue('jwt');
//
// 	try {
// 		const response = await axios.put(`${API_BASE_URL}/user/profile`, param, {
// 			withCredentials: true,
// 			headers: {
// 				accept: 'application/json',
// 				Authorization: `Bearer ${token}`
// 			}
// 		});
//
// 		// 성공
// 		if (response.status === 200) {
// 			return {
// 				status: response.status,
// 				message: 'success',
// 				data: response.data
// 			};
// 		}
//
// 		// 예상치 못한 상태 코드에 대한 처리
// 		return {
// 			status: response.status,
// 			message: 'Unexpected response status'
// 		};
// 	} catch (error) {
// 		if (axios.isAxiosError(error)) {
// 			const axiosError = error as AxiosError;
// 			if (axiosError.response) {
// 				switch (axiosError.response.status) {
// 					case 401:
// 						unauthorizedLogout();
// 						return { status: 401, message: 'Unauthorized' };
// 					default:
// 						return {
// 							status: axiosError.response.status,
// 							message: `Failed: ${axiosError.message}`
// 						};
// 				}
// 			}
// 		}
// 		return { status: 500, message: error + ': An unexpected error occurred' };
// 	}
// }
//
// interface UpdateUserPasswordParam {
// 	current_password: string;
// 	new_password: string;
// }
//
// async function updatePassword(param: UpdateUserPasswordParam): Promise<{
// 	status: number | string;
// 	message: string;
// }> {
// 	const token = getCookieValue('jwt');
//
// 	try {
// 		const response = await axios.put(`${API_BASE_URL}/user/password`, param, {
// 			withCredentials: true,
// 			headers: {
// 				accept: 'application/json',
// 				Authorization: `Bearer ${token}`
// 			}
// 		});
//
// 		// 성공
// 		if (response.status === 200) {
// 			return {
// 				status: response.status,
// 				message: 'success'
// 			};
// 		}
//
// 		// 예상치 못한 상태 코드에 대한 처리
// 		return {
// 			status: response.status,
// 			message: 'Unexpected response status'
// 		};
// 	} catch (error) {
// 		if (axios.isAxiosError(error)) {
// 			const axiosError = error as AxiosError;
// 			if (axiosError.response) {
// 				switch (axiosError.response.status) {
// 					case 401:
// 						unauthorizedLogout();
// 						return { status: 401, message: 'Unauthorized' };
// 					default:
// 						return {
// 							status: axiosError.response.status,
// 							message: `Failed: ${axiosError.message}`
// 						};
// 				}
// 			}
// 		}
// 		return { status: 500, message: error + ': An unexpected error occurred' };
// 	}
// }

const userApi = {
	login,
	// register,
	// logout,
	getUser
	// updateUser,
	// updatePassword
};

export default userApi;
