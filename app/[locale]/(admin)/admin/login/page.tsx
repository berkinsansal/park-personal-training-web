import LoginForm from './_components/LoginForm';

export default function LoginPage() {
  const defaultEmail = process.env.ADMIN_EMAIL;
  const defaultPassword = process.env.ADMIN_PASSWORD;

  return <LoginForm defaultEmail={defaultEmail} defaultPassword={defaultPassword} />;
}
