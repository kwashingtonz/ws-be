export class AppConfigurationsDto {
  private port: number;
  private ip: string;
  private host: string;
  private userName: string;
  private password: string;
  private dataBase: string;
  private dataBasePort: number;
  private url: string;

  private jwtSecret: string;
  private apiKey: string;

  //redis
  private redisPort:number;
  private redisHost:string;

  public getPort(): number {
      return this.port;
  }

  public setPort(port: number): void {
      this.port = port;
  }

  public getIp(): string {
      return this.ip;
  }

  public setIp(ip: string): void {
      this.ip = ip;
  }

  public getHost(): string {
      return this.host;
  }

  public setHost(host: string): void {
      this.host = host;
  }

  public getUserName(): string {
      return this.userName;
  }

  public setUserName(userName: string): void {
      this.userName = userName;
  }

  public getPassword(): string {
      return this.password;
  }

  public setPassword(password: string): void {
      this.password = password;
  }

  public getDataBase(): string {
      return this.dataBase;
  }

  public setDataBase(dataBase: string): void {
      this.dataBase = dataBase;
  }

  public getDataBasePort(): number {
      return this.dataBasePort;
  }

  public setDataBasePort(dataBasePort: number): void {
      this.dataBasePort = dataBasePort;
  }

  public getUrl(): string {
    return this.url;
  }  
  
  public setUrl(url: string): void {
      this.url = url;
  }
  
  public getJwtSecret(): string {
    return this.jwtSecret;
  }

  public setJwtSecret(jwtSecret: string): void {
    this.jwtSecret = jwtSecret;
  }
  
  public getApiKey(): string {
    return this.apiKey;
  }

  public setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  public getRedisPort(): number {
      return this.redisPort;
  }
  
  public setRedisPort(redisPort: number): void {
      this.redisPort = redisPort;
  }
  
  public getRedisHost(): string {
      return this.redisHost;
  }
  
  public setRedisHost(redisHost: string): void {
      this.redisHost = redisHost;
  }

}
