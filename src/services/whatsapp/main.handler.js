export const handleWelcome = () => {
    return {
        reply: {
            type: 'interactive',
            interactive: {
                type: 'list',
                header: { type: 'text', text: 'Samsara Wellness 🌸' },
                body: { text: 'Namaste! How can I help you today?' },
                footer: { text: 'Select an option below' },
                action: {
                    button: 'Menu Options',
                    sections: [
                        {
                            title: 'Samsara Services',
                            rows: [
                                { id: '1', title: 'General Wellness', description: 'Yoga, Mood, Period Tracker' },
                                { id: '2', title: 'Technical Support', description: 'App issues, Login help' },
                                { id: '3', title: 'Payment & Billing', description: 'Invoices, Subscription' },
                                { id: '4', title: 'Talk to Expert', description: 'Connect with a human agent' },
                            ],
                        },
                    ],
                },
            },
        },
        nextState: 'MAIN_MENU',
        escalation: false,
    };
};

export const handleMainMenu = (lower) => {
    if (lower === '1' || lower.includes('general')) {
        return {
            reply: {
                type: 'interactive',
                interactive: {
                    type: 'list',
                    header: { type: 'text', text: 'General Wellness 🧘‍♀️' },
                    body: { text: 'Choose a wellness tracking category:' },
                    footer: { text: 'Samsara Wellness' },
                    action: {
                        button: 'Select Category',
                        sections: [
                            {
                                title: 'Categories',
                                rows: [
                                    { id: 'yoga', title: 'Yoga & Meditation' },
                                    { id: 'workshops', title: 'Online Workshops' },
                                    { id: 'mood', title: 'Mood Tracker' },
                                    { id: 'dosha', title: 'Dosha Tracker' },
                                    { id: 'health', title: 'Health Tracker' },
                                    { id: 'period', title: 'Period Tracker' },
                                    { id: 'pcos', title: 'PCOS / PCOD' },
                                    { id: 'thyroid', title: 'Thyroid Support' },
                                    { id: 'menopause', title: 'Menopause Care' },
                                    { id: 'diet', title: 'Diet & Nutrition' },
                                ],
                            },
                        ],
                    },
                },
            },
            nextState: 'GENERAL_MENU',
            escalation: false,
        };
    }
    if (lower === '2' || lower.includes('technical')) {
        return {
            reply: {
                type: 'interactive',
                interactive: {
                    type: 'list',
                    header: { type: 'text', text: 'Technical Support 🛠' },
                    body: { text: 'Select your issue:' },
                    footer: { text: 'Samsara Support' },
                    action: {
                        button: 'Select Issue',
                        sections: [
                            {
                                title: 'Topics',
                                rows: [
                                    { id: 'app_issue', title: 'App not working' },
                                    { id: 'device_issue', title: 'Device not showing' },
                                    { id: 'login_issue', title: 'Login/Password' },
                                    { id: 'firmware', title: 'Firmware Update' },
                                    { id: 'other_tech', title: 'Other Issue' },
                                ],
                            },
                        ],
                    },
                },
            },
            nextState: 'TECH_MENU',
            escalation: false,
        };
    }
    if (lower === '3' || lower.includes('payment')) {
        return {
            reply: {
                type: 'interactive',
                interactive: {
                    type: 'list',
                    header: { type: 'text', text: 'Payment & Billing 💳' },
                    body: { text: 'Select your billing inquiry:' },
                    footer: { text: 'Samsara Billing' },
                    action: {
                        button: 'Select Option',
                        sections: [
                            {
                                title: 'Billing Topics',
                                rows: [
                                    { id: 'update_payment', title: 'Update Payment', description: 'Change payment method' },
                                    { id: 'download_invoice', title: 'Download Invoice', description: 'View or download invoice' },
                                    { id: 'payment_failed', title: 'Payment Issues', description: 'Failed or double charged' },
                                    { id: 'subscription', title: 'Subscription', description: 'Manage or cancel subscription' },
                                    { id: 'billing_team', title: 'Talk to Billing Team', description: 'Connect with specialist' },
                                ],
                            },
                        ],
                    },
                },
            },
            nextState: 'BILLING_MENU',
            escalation: false,
        };
    }
    if (lower === '4' || lower.includes('live')) {
        return {
            reply: 'Connecting you to a live expert...',
            nextState: 'ESCALATED',
            escalation: true,
        };
    }

    return null; // Let the caller handle fallback or loop
};
