"use client"

import { motion } from "framer-motion";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function AboutPage() {

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const slideUp = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="container min-h-screen bg-gradient-to-b from-background to-muted/20 mx-auto">
            <div className="container py-12 px-4 sm:px-6 lg:px-8">
                {/* Theme Toggle */}


                {/* Hero Section */}
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}  //Variants = a dictionary of animation states you can reuse across multiple elements.
                    className="text-center mb-16"
                >
                    <motion.div variants={slideUp} className="mb-8">
                        <Avatar className="w-24 h-24 mx-auto">
                            <AvatarImage src="/team-avatar.jpg" />
                            <AvatarFallback>TM</AvatarFallback>
                        </Avatar>
                    </motion.div>

                    <motion.h1
                        variants={slideUp}
                        className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
                    >
                        About Our Platform
                    </motion.h1>

                    <motion.p
                        variants={slideUp}
                        className="text-lg text-muted-foreground max-w-3xl mx-auto"
                    >
                        Transforming public transportation experiences through innovative technology and user-focused solutions.
                    </motion.p>
                </motion.section>

                {/* Mission Section */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"  //whileInView="visible" → the element will only animate when scrolled into view.(visible area of the screen).
                    viewport={{ once: true }} //viewport={{ once: true }} → the animation runs only once (doesn’t replay if you scroll up/down again).
                    // If you used viewport={{ once: false }}, the animation would trigger every time you scroll into view.
                    variants={fadeIn}
                    className="mb-16"
                >
                    <Card className="bg-background/80 backdrop-blur-sm border-border/50 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl">Our Mission</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                We&#39;re committed to improving urban mobility by providing real-time solutions
                                to transportation challenges. Our platform empowers commuters to report issues,
                                track resolutions, and contribute to better public transit systems.
                            </p>
                        </CardContent>
                    </Card>
                </motion.section>

                {/* Features Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
                >
                    {[
                        {
                            title: "Real-time Reporting",
                            description: "Instant submission of transportation issues with live tracking"
                        },
                        {
                            title: "Transparent Process",
                            description: "Full visibility into complaint resolution status"
                        },
                        {
                            title: "Community Impact",
                            description: "Collective data helps improve services for everyone"
                        }
                    ].map((feature, index) => (
                        <motion.div key={index} variants={slideUp}>
                            <Card className="h-full hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="text-primary font-semibold mb-2">{feature.title}</div>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Team Section */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    variants={fadeIn}
                >
                    <h2 className="text-3xl font-bold mb-8 text-center">Meet The Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                name: "Alex Johnson",
                                role: "Founder & CEO",
                                avatar: "/team-1.jpg"
                            },
                            {
                                name: "Maria Garcia",
                                role: "Lead Developer",
                                avatar: "/team-2.jpg"
                            },
                            {
                                name: "Sam Wilson",
                                role: "UX Designer",
                                avatar: "/team-3.jpg"
                            },
                            {
                                name: "Priya Patel",
                                role: "Community Manager",
                                avatar: "/team-4.jpg"
                            }
                        ].map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col items-center text-center"
                            >
                                <Avatar className="w-20 h-20 mb-4">
                                    <AvatarImage src={member.avatar} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <h3 className="font-medium">{member.name}</h3>
                                <p className="text-sm text-muted-foreground">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            </div>
        </div>
    );
}