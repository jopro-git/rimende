import { signOut } from "@/lib/chores/actions";

export function Header({ userEmail }: { userEmail: string }) {
  return (
    <header className="border-b border-gray-800 bg-gray-900">
      <div className="mx-auto max-w-3xl px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-100 tracking-tight">
          Rimende
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 hidden sm:block">
            {userEmail}
          </span>
          <form action={signOut}>
            <button
              type="submit"
              className="text-sm text-gray-500 hover:text-gray-200 transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
