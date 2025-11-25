import RequestProposalForm from "@/app-components/request-proposal-form";
import { Header } from "@/app-components/header";
import { Footer } from "@/app-components/footer";

export default function RequestProposalPage() {
    return (
        <main className="min-h-screen relative">
            

            <Header />
            <div className="container mx-auto px-4 py-12 relative z-10">
                <RequestProposalForm />
            </div>
            <Footer />
        </main>
    );
}
