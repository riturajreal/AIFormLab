import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <SignIn
        appearance={{
          baseTheme: "dark",
          variables: {
            colorPrimary: '#3b82f6',
            colorBackground: '#09090b',
            colorInputBackground: '#18181b',
            colorInputText: '#ffffff',
            colorText: '#ffffff',
          },
          elements: {
            card: "bg-zinc-950 shadow-2xl border border-zinc-800",
            formButtonPrimary: "bg-blue-500 hover:bg-blue-600 text-white",
            formFieldInput: "bg-zinc-900 border-zinc-700 text-white",
            footerActionLink: "text-blue-500 hover:text-blue-400",
            headerTitle: "text-white",
            headerSubtitle: "text-zinc-400",
            dividerLine: "bg-zinc-800",
            dividerText: "text-zinc-500",
            formFieldLabel: "text-zinc-300",
            formFieldHintText: "text-zinc-500",
            identityPreviewText: "text-zinc-300",
            formFieldSuccessText: "text-green-500",
            formFieldErrorText: "text-red-500",
            socialButtonsIconButton: "bg-zinc-900 border-zinc-700 hover:bg-zinc-800",
            socialButtonsBlockButton: "bg-zinc-900 border-zinc-700 hover:bg-zinc-800",
            navbar: "hidden",
            headerBackIcon: "text-zinc-300",
            headerBackLink: "text-zinc-300 hover:text-zinc-100",
          }
        }}
      />
    </div>
  );
}