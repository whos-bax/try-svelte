import axios, { AxiosError } from 'axios';
import { API_BASE_URL, getCookieValue } from '$lib/api/common';

export interface ProjectCreateParam {
	project_type: 'classification' | 'detection';
	name: string;
	description: string;
	class_labels: { [key: number]: string };
	directory_ids: string[];
}

export type ProjectType = {
	project_type: 'classification' | 'detection';
	name: string;
	description: string;
	class_labels: { [key: number]: string };
	membership_id: string;
	is_owner: boolean;
};

/**
 * /project
 ***********************************************************************
 ***********************************************************************
 */
interface ProjectGetResponse {
	projects: ProjectType[];
}

async function getProjectAll(): Promise<{
	status: number | string;
	message: string;
	data?: ProjectGetResponse;
}> {
	const token = getCookieValue('jwt');
	try {
		const response = await axios.get(`${API_BASE_URL}/project`, {
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

interface ProjectMembershipIdParam {
	membership_id: string;
}

async function createProject(param: ProjectCreateParam): Promise<{
	status: number | string;
	message: string;
	data?: ProjectMembershipIdParam;
}> {
	const token = getCookieValue('jwt');
	try {
		const response = await axios.post(`${API_BASE_URL}/project`, param, {
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
		return { status: 500, message: error + ': An unexpected error occurred' };
	}
}

async function deleteProject(param: { membership_id: string }): Promise<{
	status: number | string;
	message: string;
	data?: {
		deleted_project: string;
	};
}> {
	const token = getCookieValue('jwt');
	try {
		const response = await axios.delete(`${API_BASE_URL}/project`, {
			params: param,
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
		return { status: 500, message: error + ': An unexpected error occurred' };
	}
}

type UpdateProjectClassLabelsParam = {
	membership_id: string;
	class_labels: { [key: number]: string };
};

async function updateProjectClassLabels(param: UpdateProjectClassLabelsParam): Promise<{
	status: number | string;
	message: string;
	data?: any;
}> {
	const token = getCookieValue('jwt');
	const body = {
		value: param.class_labels
	};

	try {
		const response = await axios.put(`${API_BASE_URL}/project/class-labels`, body, {
			params: {
				membership_id: param.membership_id
			},
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
		return { status: 500, message: error + ': An unexpected error occurred' };
	}
}

/**
 * /project/membership
 ***********************************************************************
 ***********************************************************************
 */

export interface ProjectMembershipGetResponse {
	name: string;
	description: string;
	project_type: 'classification' | 'detection';
	class_labels: { [key: number]: string };
	member_info: {
		[email: string]: {
			id: string;
			read: boolean;
			write: boolean;
			owner: boolean;
		};
	};
	membership_id: string;
}

async function getProjectMembership(param: ProjectMembershipIdParam): Promise<{
	status: number | string;
	message: string;
	data?: ProjectMembershipGetResponse;
}> {
	const token = getCookieValue('jwt');
	// const token = param.token;
	try {
		const response = await axios.get(`${API_BASE_URL}/project/membership`, {
			withCredentials: true,
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${token}`
			},
			params: param
		});
		// 성공
		if (response.status === 200) {
			return {
				status: response.status,
				message: 'success',
				data: { ...response.data, membership_id: param.membership_id }
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

export type MemberType = {
	id?: string | null;
	email: string;
	read: boolean;
	write: boolean;
	owner: boolean;
};

interface ProjectMembershipCreateParam extends MemberType {
	membership_id: string;
}

async function createProjectMembership(param: ProjectMembershipCreateParam): Promise<{
	status: number | string;
	message: string;
	data?: any;
}> {
	const token = getCookieValue('jwt');
	const body = {
		email: param.email,
		read: param.read,
		write: param.write
	};
	try {
		const response = await axios.post(`${API_BASE_URL}/project/membership`, body, {
			params: { membership_id: param.membership_id },
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
		return { status: 500, message: error + ': An unexpected error occurred' };
	}
}

interface ProjectMembershipUpdateParam extends ProjectMembershipCreateParam {
	update: string;
}

async function updateProjectMembership(param: ProjectMembershipUpdateParam): Promise<{
	status: number | string;
	message: string;
	data?: any;
}> {
	const token = getCookieValue('jwt');
	const body = {
		read: param.read,
		write: param.write,
		owner: param.owner
	};
	const params = {
		membership_id: param.membership_id,
		update: param.update
	};

	try {
		const response = await axios.put(`${API_BASE_URL}/project/membership`, body, {
			params,
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
		return { status: 500, message: error + ': An unexpected error occurred' };
	}
}

export interface ProjectMembershipDeleteParam extends ProjectMembershipIdParam {
	revoke: string;
}

async function deleteProjectMembership(param: ProjectMembershipDeleteParam): Promise<{
	status: number | string;
	message: string;
	data?: any;
}> {
	const token = getCookieValue('jwt');
	const params = {
		membership_id: param.membership_id,
		revoke: param.revoke
	};

	try {
		const response = await axios.delete(`${API_BASE_URL}/project/membership`, {
			params,
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
		return { status: 500, message: error + ': An unexpected error occurred' };
	}
}

interface ProjectMembershipTicketCreateParam extends ProjectMembershipIdParam {
	length: number;
}
interface ProjectMembershipTicketCreateResponse extends ProjectMembershipIdParam {
	ticket_id: string;
}

async function createProjectMembershipTicket(param: ProjectMembershipTicketCreateParam): Promise<{
	status: number | string;
	message: string;
	data?: ProjectMembershipTicketCreateResponse;
}> {
	const token = getCookieValue('jwt');
	try {
		const response = await axios.post(
			`${API_BASE_URL}/project/membership/ticket`,
			{},
			{
				params: param,
				withCredentials: true,
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${token}`
				}
			}
		);

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
						// // unauthorizedLogout();
						return { status: 401, message: 'Unauthorized' };
					default:
						return {
							status: axiosError.response.status,
							message: `Failed: ${axiosError.message}`
						};
				}
			}
		}
		return { status: 500, message: error + ': An unexpected error occurred' };
	}
}

async function getProjectMembershipTickets(param: ProjectMembershipIdParam): Promise<{
	status: number | string;
	message: string;
	data?: { ticket_ids: string[] };
}> {
	const token = getCookieValue('jwt');
	try {
		const response = await axios.get(`${API_BASE_URL}/project/membership/tickets`, {
			withCredentials: true,
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${token}`
			},
			params: param
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

/**
 * /project/ticket
 ***********************************************************************
 ***********************************************************************
 */

interface ProjectTicketParam {
	membership_id: string;
	ticket_id: string;
}
export interface ProjectTicketResponse {
	ticket: {
		worker_email: string;
		worker_username: string;
	};
	data_pair_ids: string[];
}

async function getProjectTicket(param: ProjectTicketParam): Promise<{
	status: number | string;
	message: string;
	data?: ProjectTicketResponse;
}> {
	const token = getCookieValue('jwt');
	try {
		const response = await axios.get(`${API_BASE_URL}/project/ticket`, {
			withCredentials: true,
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${token}`
			},
			params: param
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

async function deleteProjectTicket(param: ProjectMembershipTicketCreateResponse): Promise<{
	status: number | string;
	message: string;
	data?: {
		deleted_ticket_id: string;
	};
}> {
	const token = getCookieValue('jwt');
	try {
		const response = await axios.delete(`${API_BASE_URL}/project/ticket`, {
			params: param,
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
		return { status: 500, message: error + ': An unexpected error occurred' };
	}
}

/**
 * /project/datapair
 ***********************************************************************
 ***********************************************************************
 */

interface ProjectDataPairsParam {
	membership_id: string;
	offset: number; // min 0
	pageSize: number; // min 0, max 500
}

interface ProjectDataPairParam {
	membership_id: string;
	datapair_id: string;
}

async function getProjectDataPairs(param: ProjectDataPairsParam): Promise<{
	status: number | string;
	message: string;
	data?: { total_counts: number; data_pair_ids: string[] };
}> {
	const token = getCookieValue('jwt');
	try {
		const response = await axios.get(`${API_BASE_URL}/project/datapairs`, {
			withCredentials: true,
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${token}`
			},
			params: param
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

interface ProjectAddProjectDataPairsParam extends ProjectMembershipIdParam {
	directory_ids: string[];
	file_ids: string[];
}

async function addProjectDataPairs(param: ProjectAddProjectDataPairsParam): Promise<{
	status: number | string;
	message: string;
	data?: any;
}> {
	const token = getCookieValue('jwt');
	try {
		const body = {
			directory_ids: param.directory_ids,
			file_ids: param.file_ids
		};

		const params = {
			membership_id: param.membership_id
		};

		const response = await axios.post(`${API_BASE_URL}/project/datapairs`, body, {
			params,
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

async function getProjectDataPair(param: ProjectDataPairParam): Promise<{
	status: number | string;
	message: string;
	data?: {
		filename: string;
		file: BlobPart;
	};
}> {
	const token = getCookieValue('jwt');
	try {
		const response = await axios.get(`${API_BASE_URL}/project/datapair`, {
			withCredentials: true,
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${token}`
			},
			params: param,
			responseType: 'blob'
		});
		// 성공
		if (response.status === 200) {
			return {
				status: response.status,
				message: 'success',
				data: {
					filename: response.headers['x-filename'],
					file: response.data
				}
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

async function getProjectDataPairThumbnail(param: ProjectDataPairParam): Promise<{
	status: number | string;
	message: string;
	data?: { contentType: string; filename: string; file: BlobPart };
}> {
	const token = getCookieValue('jwt');
	try {
		const response = await axios.get(`${API_BASE_URL}/project/datapair/thumbnail`, {
			withCredentials: true,
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${token}`
			},
			params: param,
			responseType: 'blob'
		});
		// 성공
		if (response.status === 200) {
			const contentType = response.headers['content-type'];
			return {
				status: response.status,
				message: 'success',
				data: {
					contentType,
					filename: response.headers['x-filename'],
					file: response.data
				}
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

/**
 * /project/ticket
 ***********************************************************************
 ***********************************************************************
 */

const projectApi = {
	getProjectAll,
	createProject,
	deleteProject,
	updateProjectClassLabels,
	//
	getProjectMembership,
	createProjectMembership,
	updateProjectMembership,
	deleteProjectMembership,
	createProjectMembershipTicket,
	getProjectMembershipTickets,
	//
	getProjectTicket,
	deleteProjectTicket,
	//
	getProjectDataPairs,
	addProjectDataPairs,
	getProjectDataPair,
	getProjectDataPairThumbnail
};

export default projectApi;
