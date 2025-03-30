"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp, CircleAlert, ShieldAlert, TriangleAlert, User } from "lucide-react"


const InvestmentDesign = () => {
    // State for tracking which plan is open
    const [openPlan, setOpenPlan] = useState<string | null>(null)
    // State for tracking which FAQ is open
    const [openFaq, setOpenFaq] = useState<string | null>(null)

    // Toggle function for plans
    const togglePlan = (planId: string) => {
        setOpenPlan(openPlan === planId ? null : planId)
    }

    // Toggle function for FAQs
    const toggleFaq = (faqId: string) => {
        setOpenFaq(openFaq === faqId ? null : faqId)
    }

    // Plan data
    const plans = [
        {
            id: "bonus",
            title: "Bonus Plan",
            content:
                "The Bonus Plan offers additional rewards for early investors. Get up to 10% bonus on your initial investment and enjoy priority access to new features and investment opportunities.",
        },
        {
            id: "premium",
            title: "Premium Coverage Plan",
            content:
                "Our Premium Coverage Plan provides comprehensive protection against market volatility. Enjoy up to 40% coverage on potential losses and gain access to exclusive investment strategies.",
        },
        {
            id: "leverage",
            title: "Leverage & Protection Plan",
            content:
                "Maximize your investment potential with our Leverage & Protection Plan. Get up to 2x leverage on your investments while maintaining protection against significant market downturns.",
        },
        {
            id: "crypto",
            title: "Crypto Holdings Secure Plan",
            content:
                "Secure your diverse crypto portfolio with our Holdings Secure Plan. This plan covers multiple cryptocurrencies and provides cross-chain protection for your digital assets.",
        },
        {
            id: "exclusive",
            title: "Exclusive Growth Plan",
            content:
                "Our premium tier offering designed for serious investors. The Exclusive Growth Plan combines high-yield investment opportunities with maximum protection and personalized investment advice.",
        },
    ]

    // FAQ data
    const faqs = [
        {
            id: "protection",
            question: "How does BITSI's protection plan work?",
            answer:
                "BITSI's protection plan offers coverage by setting aside a portion of funds in a secure reserve. When market drops occur, this reserve automatically compensates investors based on their plan tier and investment amount, ensuring your portfolio remains protected against significant losses.",
        },
        {
            id: "price-drop",
            question: "What happens during a price drop?",
            answer:
                "During a price drop, BITSI's smart contracts automatically detect the decrease and calculate compensation based on your protection plan. Funds are distributed to your wallet within 24 hours, helping to offset losses and maintain portfolio value during market downturns.",
        },
        {
            id: "buy",
            question: "How do I buy BITSI?",
            answer:
                "You can buy BITSI tokens through our platform by connecting your wallet and selecting your desired investment amount. We support multiple payment methods including major cryptocurrencies and select fiat options. All transactions are secured through our verified smart contracts.",
        },
        {
            id: "supply",
            question: "What's the difference between total and circulating supply?",
            answer:
                "Total supply refers to all BITSI tokens that will ever exist (capped at 100 million), while circulating supply refers to tokens currently available in the market. The difference includes tokens locked for development, insurance reserves, and future distribution according to our tokenomics plan.",
        },
        {
            id: "price-change",
            question: "How does BITSI's price change over time?",
            answer:
                "BITSI's price is determined by market demand, platform adoption, and our tokenomics model. We implement a partial buy-back and burn mechanism that reduces supply over time, creating deflationary pressure. Additionally, as more users join our protection plans, demand increases, potentially driving price appreciation.",
        },
    ]

    return (
        <>

            <main className="py-16 text-white bg-[#0D0D2B]">
                {/* Hero Section */}
                <section className="container mx-auto px-4 py-24 md:py-16 grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6 pt-12">
                        <h1 className="text-3xl md:text-5xl font-bold text-white">
                            Invest with BITSI - <span className="text-[#FFB622]">Secure, Smart & Protected</span>
                        </h1>
                        <p className="text-gray-300 text-sm md:text-base">
                            A safe way to get high returns on crypto investments & protection.
                        </p>
                        <p className="text-gray-300 text-sm md:text-lg">
                            BITSI's Insurance Mechanism Your Investments is Safe & Secure!
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-start gap-2">
                                <TriangleAlert className="text-[#FFB622]" />
                                <p className="text-sm text-gray-300">
                                    <span className="font-medium">Risk Protection</span> - Stay covered against market drops
                                    with built-in compensation
                                </p>
                            </div>
                            <div className="flex items-start gap-2">
                                <ShieldAlert className="text-[#FFB622]" /> 
                                <p className="text-sm text-gray-300">
                                    <span className="font-medium">Smart Contract Security</span> - Automated deposits ensure
                                    transparency & reliability
                                </p>
                            </div>
                            <div className="flex items-start gap-2">
                            <User className="text-[#FFB622]" />
                                <p className="text-sm text-gray-300">
                                    <span className="font-medium">Investor Confidence</span> - 100% BITSI self-guaranteed
                                    protection and secure long-term growth
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="relative w-64 h-64 md:w-80 md:h-80">
                            <Image
                                src="/icons/investment-design.png"
                                alt="BITSI Investment"
                                width={420}
                                height={420}
                                className="object-contain"
                            />
                        </div>
                    </div>
                </section>
            </main>
                {/* Investment Plans */}
                <section className="container mx-auto px-4 py-8 md:py-12">
                    <h2 className="text-xl md:text-2xl font-bold text-[#FFB622] mb-4">INVESTMENT PLANS</h2>
                    <p className="text-gray-300 text-lg mb-6 font-[600]">
                        All investors are entitled to receive following discounts as a height of investment
                    </p>

                    <div className="overflow-x-auto text-white shadow-lg rounded-2xl bg-success-512 secondary-shadow11 p-4 mb-8">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b border-gray-700">
                                    <th className="pb-2 text-[#FFB622] font-[600]">Investment</th>
                                    <th className="pb-2 text-[#FFB622] font-[600]">Discount</th>
                                    <th className="pb-2 text-[#FFB622] font-[600]">Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-[#1d4649]">
                                    <td className="py-3 font-[600]">5k$</td>
                                    <td className="py-3 text-[#B982FF] font-[600]">20%</td>
                                    <td className="py-3 font-[600]">Small</td>
                                </tr>
                                <tr className="border-b border-[#1d4649]">
                                    <td className="py-3 font-[600]">10k$</td>
                                    <td className="py-3 text-[#B982FF] font-[600]">30%</td>
                                    <td className="py-3 font-[600]">Large</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="text-sm text-gray-300 space-y-2 mb-8">
                        <div className="text-sm font-[500] flex gap-2"><CircleAlert />Each plan is subject to BITSI system approval based on market conditions</div>
                        <div className="text-lg font-[600]">Insurance policy commitment for at least 5 years</div>
                    </div>

                    {/* Collapsible Plans */}
                    <div className="space-y-4">
                        {plans.map((plan) => (
                            <div key={plan.id} className="border border-teal-800 rounded-xl bg-success-512 secondary-shadow11 overflow-hidden">
                                <button
                                    className="w-full flex items-center justify-between p-6 text-left"
                                    onClick={() => togglePlan(plan.id)}
                                >
                                    <span className="text-[#FFB622] font-medium">{plan.title}</span>
                                    {openPlan === plan.id ? (
                                        <ChevronUp className="w-5 h-5 text-[#FFB622]" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-[#FFB622]" />
                                    )}
                                </button>
                                {openPlan === plan.id && (
                                    <div className="p-4 pt-0 text-sm text-gray-300 border-t border-teal-800/50 animate-accordion-down">
                                        {plan.content}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Investors History Table */}
                <section className="container mx-auto px-4 py-8 md:py-12">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl md:text-2xl font-bold text-[#FFB622]">INVESTORS HISTORY TABLE</h2>
                        
                    </div>

                    <div className="overflow-x-auto shadow-lg rounded-2xl bg-success-512 secondary-shadow11 p-4 ">
                        <div className="py-4 flex justify-end items-center">
                            <button className="text-sm border border-[#FFB622] text-white font-[600] px-3 py-1 rounded">Add plan</button>
                        </div>
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b border-gray-700">
                                    <th className="pb-2 text-[#FFB622] font-[600]">Time initiated</th>
                                    <th className="pb-2 text-[#FFB622] font-[600]">Plan</th>
                                    <th className="pb-2 text-[#FFB622] font-[600]">Amount Invested</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="">
                                    <td className="py-4 text-[#fff] font-[600]">10:19 PM, 10/02/23</td>
                                    <td className="py-4 text-[#B982FF] font-[600]">Premium Coverage Plan</td>
                                    <td className="py-4 text-[#fff] font-[600]">2k$</td>
                                </tr>
                                <tr className="">
                                    <td className="py-4 text-[#fff] font-[600]">08:23 PM, 10/01/23</td>
                                    <td className="py-4 text-[#B982FF] font-[600]">Bonus Plan</td>
                                    <td className="py-4 text-[#fff] font-[600]">1.5k$</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* FAQ Section */}
                <div className="bg-[#0D0D2B] py-20">
                    <section className="container mx-auto px-4 py-8 md:py-12">
                        <h2 className="text-xl md:text-2xl font-bold mb-6 text-[#FFB622]">Frequently Asked Questions</h2>

                        <div className="space-y-4 text-white">
                            {faqs.map((faq) => (
                                <div key={faq.id} className="border-b border-gray-700 rounded-md overflow-hidden">
                                    <button
                                        className="w-full flex items-center justify-between py-4 text-left"
                                        onClick={() => toggleFaq(faq.id)}
                                    >
                                        <span className="font-medium">{faq.question}</span>
                                        {openFaq === faq.id ? <ChevronUp className="w-5 h-5 text-[#FFB622]" /> : <ChevronDown className="w-5 h-5 text-[#FFB622]" />}
                                    </button>
                                    {openFaq === faq.id && (
                                        <div className="py-4 pt-0 text-sm text-gray-300 animate-accordion-down">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            
        </>
    )
}

export default InvestmentDesign