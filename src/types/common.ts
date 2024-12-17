export interface IUser {
	id: number;
	nickName: string;
	userName: string;
	role: IRole[];
}

//权限
export interface IRoleWithAuth {
	roleId: number; //角色id
	roleName: string; //角色名称
	auth: string[]; //角色权限
}

export interface IUserWithRole {
	nickName: string;
	role: number;
}

export interface IEditUser {
	id: number;
	nickName: string;
	role: number[];
}

export interface IRole {
	roleId: number;
	roleName: string;
	authority?: number[];
}
