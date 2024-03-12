export class LoginUserInfo {

  private userId: number;

  private jwtToken: any;

  fillViaObject(userObj: any) {
    this.jwtToken = userObj.jwtToken;
    this.userId = userObj.userId;

  }

  public getUserId(): number {
    return this.userId;
  }

  public setUserId(userId: number): void {
    this.userId = userId;
  }

  public getJwtToken(): any {
    return this.jwtToken;
  }

  public setJwtToken(jwtToken: any): void {
    this.jwtToken = jwtToken;
  }

}
