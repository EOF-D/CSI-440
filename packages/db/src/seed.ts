import { PrismaClient, UserRole, CourseStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
    await prisma.assessmentCLO.deleteMany();
    await prisma.assessment.deleteMany();
    await prisma.contentUnit.deleteMany();
    await prisma.courseLearningOutcome.deleteMany();
    await prisma.resourcePlanning.deleteMany();
    await prisma.course.deleteMany();
    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.verificationToken.deleteMany();
    await prisma.user.deleteMany();

    const hashedPassword = await bcrypt.hash("testing!", 14);
    await prisma.user.create({
        data: {
            email: "andy.zheng@mymail.champlain.edu",
            name: "Andy Zheng",
            password: hashedPassword,
            role: UserRole.ADMIN,
            emailVerified: new Date(),
        },
    });

    const facultyUsers = await Promise.all([
        prisma.user.create({
            data: {
                email: "foo@champlain.edu",
                name: "foo",
                password: hashedPassword,
                role: UserRole.FACULTY,
                emailVerified: new Date(),
            },
        }),
        prisma.user.create({
            data: {
                email: "bar@champlain.edu",
                name: "bar",
                password: hashedPassword,
                role: UserRole.FACULTY,
                emailVerified: new Date(),
            },
        }),
        prisma.user.create({
            data: {
                email: "baz@champlain.edu",
                name: "baz",
                password: hashedPassword,
                role: UserRole.FACULTY,
                emailVerified: new Date(),
            },
        }),
    ]);

    const course1 = await prisma.course.create({
        data: {
            proposalId: "PROP-2025-001",
            coursePrefix: "CCT",
            courseNumber: 110,
            title: "INQUIRY for a World In-Flux",
            credits: 3,
            catalogDescription: `What do you care about? What draws you in or propels you forward? How might your interests, passions or values drive your academic, professional and creative pursuits? In this class you will practice developing and committing to a set of questions and a process of inquiry that disrupts traditional academic hierarchies. You'll learn techniques for exploring topics, refining questions and discovering how inquiry can challenge normative knowledge production. Through iterative writing and collaborative investigation with faculty and the classroom learning community, you'll develop your ideas while learning to navigate friction between different ways of knowing.`,
            status: CourseStatus.APPROVED,
            currentModule: "complete",
            completedModules: [
                "identity",
                "outcomes",
                "content",
                "assessment",
                "resources",
            ],
            authorId: facultyUsers[2].id,
            learningOutcomes: {
                create: [
                    {
                        cloCode: "CLO1",
                        description:
                            "Develop Questions: Formulate meaningful, complex questions that guide inquiry, acknowledge ambiguity and complexity of real-world issues, and challenge normative knowledge production",
                        linkedPLOs: ["PLO1"],
                        competencies: {
                            INQ: 3,
                            GCU: 3,
                        },
                    },
                    {
                        cloCode: "CLO2",
                        description:
                            "Analyze and Interpret Texts: Apply close reading techniques to uncover deeper meanings and perspectives while recognizing epistemological pluralism",
                        linkedPLOs: ["PLO1"],
                        competencies: {
                            INQ: 3,
                            GCU: 3,
                        },
                    },
                    {
                        cloCode: "CLO3",
                        description:
                            "Apply Interdisciplinary Perspectives: Integrate insights from different fields to enhance understanding, navigating productive friction between disciplines",
                        linkedPLOs: ["PLO2"],
                        competencies: {
                            INT: 2,
                        },
                    },
                    {
                        cloCode: "CLO4",
                        description:
                            "Communicate Through Iterative Writing: Produce clear, well-organized academic writing through iterative revision, developing both exploratory and communicative modes",
                        linkedPLOs: [],
                        competencies: {
                            COM: 3,
                        },
                    },
                    {
                        cloCode: "CLO5",
                        description:
                            "Reflect on Inquiry and Assumptions: Critically reflect on assumptions inherent in evidence and questions, evaluating how power dynamics shape inquiry process",
                        linkedPLOs: ["PLO3"],
                        competencies: {
                            INQ: 3,
                            GCU: 3,
                        },
                    },
                ],
            },
            contentUnits: {
                create: [
                    {
                        title: "Foundational Skills",
                        order: 1,
                        themes: {
                            topics: [
                                "Note Taking and Journaling",
                                "Close Reading Techniques",
                                "Writing as Iterative Practice",
                                "Genre Awareness",
                            ],
                        },
                    },
                    {
                        title: "Inquiry and Question Formulation",
                        order: 2,
                        themes: {
                            topics: [
                                "Identifying meaningful questions",
                                "Developing Field of Study",
                                "Reflective processes",
                                "Challenging predetermined pathways",
                            ],
                        },
                    },
                    {
                        title: "Disciplinary-Interdisciplinary Integration",
                        order: 3,
                        themes: {
                            topics: [
                                "Dynamic of disciplinary knowledge",
                                "Research through multiple lenses",
                                "Making connections across domains",
                                "Understanding friction between epistemologies",
                            ],
                        },
                    },
                    {
                        title: "Critical Consciousness Development",
                        order: 4,
                        themes: {
                            topics: [
                                "Recognizing unstable disciplinary fields",
                                "Understanding co-investigation",
                                "Examining power dynamics",
                                "Developing agency over professional identity",
                            ],
                        },
                    },
                ],
            },
            assessments: {
                create: [
                    {
                        assessmentCode: "A1",
                        name: "Research Investigative Inquiry Paper",
                        assessmentType: "Signature Assignment",
                        description: `The signature assignment is a Research Investigative Inquiry paper that follows Laff and Carlson's "Hacking College" methodology, scaffolded through various inquiry and research activities throughout the semester. Through iterative writing and composition processes, students develop their first articulation of how their personal knowledge, lived experiences, critical questions, and newly acquired skillsets converge to form their emerging Field of Study.`,
                        weightPercentage: 40,
                    },
                    {
                        assessmentCode: "A2",
                        name: "Weekly Reflection Journals",
                        assessmentType: "Formative Assessment",
                        description:
                            "Regular reflective writing assignments that track the development of inquiry skills and critical thinking throughout the semester.",
                        weightPercentage: 20,
                    },
                    {
                        assessmentCode: "A3",
                        name: "Interdisciplinary Analysis",
                        assessmentType: "Analytical Paper",
                        description:
                            "Students analyze a topic through at least three different disciplinary lenses, demonstrating understanding of epistemological pluralism.",
                        weightPercentage: 25,
                    },
                    {
                        assessmentCode: "A4",
                        name: "Peer Review Participation",
                        assessmentType: "Participation",
                        description:
                            "Active engagement in iterative writing workshops and peer feedback sessions.",
                        weightPercentage: 15,
                    },
                ],
            },
            resources: {
                create: {
                    classroomType: "STANDARD",
                    capacity: 18,
                    technologyLevel: "BASIC",
                    technologyNeeds:
                        "Standard classroom projection and internet access",
                    libraryStatus: "PENDING",
                    libraryNotes:
                        "Consultation with Bethany Dietrich scheduled",
                    estimatedCost: 0,
                    additionalNotes:
                        "Dependent on instructor's individual plan",
                },
            },
        },
    });

    const course2 = await prisma.course.create({
        data: {
            proposalId: "PROP-2025-002",
            coursePrefix: "CCT",
            courseNumber: 120,
            title: "Community Quest",
            credits: 3,
            catalogDescription: `In Community Quest, students investigate community dynamics through critical analysis grounded in Community Engaged Scholarship theoretical frameworks. Building on inquiry skills and critical consciousness from the previous course, students learn to analyze communities as contested terrain—sites of both empowerment and exclusion, mutual support and inequality. Through faculty-developed case studies from diverse disciplinary and professional perspectives, students examine how communities form, sustain, transform, and dissolve. Students develop competencies in analyzing community assets and deficits, understanding participatory research principles, and critically examining power dynamics such as those within town-gown relationships.`,
            status: CourseStatus.IN_REVIEW,
            currentModule: "assessment",
            completedModules: ["identity", "outcomes", "content"],
            authorId: facultyUsers[0].id,
            learningOutcomes: {
                create: [
                    {
                        cloCode: "CLO1",
                        description:
                            "Analyze Community Dynamics: Evaluate through case studies and theoretical frameworks how communities form, sustain, transform, and dissolve while creating both belonging and exclusion",
                        linkedPLOs: ["PLO1", "PLO2"],
                        competencies: {
                            GCU: 3,
                            INQ: 3,
                            DEI: 2,
                            INT: 2,
                            ANL: 2,
                        },
                    },
                    {
                        cloCode: "CLO2",
                        description:
                            "Apply Community Engaged Scholarship Frameworks: Understand and critique participatory research methods, examining how different approaches position community members as subjects versus co-investigators",
                        linkedPLOs: ["PLO2"],
                        competencies: {
                            INT: 2,
                            INQ: 3,
                            ANL: 2,
                        },
                    },
                    {
                        cloCode: "CLO3",
                        description:
                            "Evaluate Asset and Deficit Approaches: Analyze how different frameworks identify community strengths versus problems, understanding the implications of each approach",
                        linkedPLOs: ["PLO3"],
                        competencies: {
                            GCU: 3,
                            INQ: 3,
                            ANL: 2,
                        },
                    },
                    {
                        cloCode: "CLO4",
                        description:
                            "Examine Power and Positionality: Critically analyze power dynamics, contested boundaries, and issues of social positioning within community contexts through case studies",
                        linkedPLOs: ["PLO3"],
                        competencies: {
                            GCU: 3,
                            INQ: 3,
                            ANL: 2,
                        },
                    },
                    {
                        cloCode: "CLO5",
                        description:
                            "Assess Community Knowledge Systems: Evaluate different epistemologies and forms of knowledge production within and about communities",
                        linkedPLOs: ["PLO2"],
                        competencies: {
                            INT: 2,
                            INQ: 3,
                            ANL: 2,
                        },
                    },
                    {
                        cloCode: "CLO6",
                        description:
                            "Compare Community Theories: Apply multiple theoretical lenses to understand communities across scales and contexts",
                        linkedPLOs: ["PLO1"],
                        competencies: {
                            GCU: 3,
                            INQ: 3,
                        },
                    },
                ],
            },
            contentUnits: {
                create: [
                    {
                        title: "Community Analysis Frameworks",
                        order: 1,
                        themes: {
                            topics: [
                                "Community Engaged Scholarship Theory",
                                "Asset-Based vs. Deficit-Based Analysis",
                                "Epistemic Justice",
                                "Reciprocity and Extraction",
                                "Process vs. Product Orientations",
                            ],
                        },
                    },
                    {
                        title: "Critical Community Theory",
                        order: 2,
                        themes: {
                            topics: [
                                "Contested Terrain",
                                "Inclusion/Exclusion Mechanisms",
                                "Imagined Communities",
                                "Scale and Community",
                                "Cultural Capital and Community Wealth",
                            ],
                        },
                    },
                    {
                        title: "Power Dynamics and Representation",
                        order: 3,
                        themes: {
                            questions: [
                                "How power dynamics shape community narratives",
                                "How different theoretical frameworks reveal different aspects",
                                "How case studies illuminate inclusion and exclusion",
                                "How academic vs self-representations differ",
                            ],
                        },
                    },
                ],
            },
            assessments: {
                create: [
                    {
                        assessmentCode: "A1",
                        name: "Comparative Community Analysis Paper",
                        assessmentType: "Signature Assignment",
                        description:
                            "A comparative analytical research paper that applies theoretical frameworks and perspectives on community developed throughout the course to examine 2-3 community case studies. Students engage with Community Engaged Scholarship principles to critically analyze different approaches to understanding communities.",
                        weightPercentage: 35,
                    },
                ],
            },
            resources: {
                create: {
                    classroomType: "LAB",
                    capacity: 20,
                    technologyLevel: "BASIC",
                    technologyNeeds: "Basic classroom technology only",
                    libraryStatus: "NOT_NEEDED",
                    libraryNotes: null,
                    estimatedCost: 0,
                    additionalNotes:
                        "Designed to be taught in Burlington and/or in Dublin/Montreal Summer Sessions",
                },
            },
        },
    });

    const course1CLOs = await prisma.courseLearningOutcome.findMany({
        where: { courseId: course1.id },
    });

    const course1Assessments = await prisma.assessment.findMany({
        where: { courseId: course1.id },
    });

    await prisma.assessmentCLO.create({
        data: {
            assessmentId: course1Assessments[0].id,
            cloId: course1CLOs[0].id,
        },
    });

    await prisma.assessmentCLO.create({
        data: {
            assessmentId: course1Assessments[0].id,
            cloId: course1CLOs[1].id,
        },
    });

    await prisma.assessmentCLO.create({
        data: {
            assessmentId: course1Assessments[0].id,
            cloId: course1CLOs[4].id,
        },
    });

    await prisma.assessmentCLO.create({
        data: {
            assessmentId: course1Assessments[1].id,
            cloId: course1CLOs[4].id,
        },
    });

    await prisma.assessmentCLO.create({
        data: {
            assessmentId: course1Assessments[2].id,
            cloId: course1CLOs[2].id,
        },
    });

    const course2CLOs = await prisma.courseLearningOutcome.findMany({
        where: { courseId: course2.id },
    });

    const course2Assessment = await prisma.assessment.findFirst({
        where: { courseId: course2.id },
    });

    if (course2Assessment) {
        await prisma.assessmentCLO.create({
            data: {
                assessmentId: course2Assessment.id,
                cloId: course2CLOs[0].id,
            },
        });

        await prisma.assessmentCLO.create({
            data: {
                assessmentId: course2Assessment.id,
                cloId: course2CLOs[1].id,
            },
        });

        await prisma.assessmentCLO.create({
            data: {
                assessmentId: course2Assessment.id,
                cloId: course2CLOs[3].id,
            },
        });
    }
}

main()
    .catch((e) => {
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
