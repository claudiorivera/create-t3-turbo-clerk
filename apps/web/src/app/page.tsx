import { auth, UserButton } from "@clerk/nextjs";

export default function HomePage() {
  const { userId } = auth();

  return (
    <div>
      <p>User Id: {userId}</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
