export default interface TEmailConfiguration {
  sender: string;
  user: string;
  password: string;
  host: string;
  port: number;
  secure: boolean;
}
