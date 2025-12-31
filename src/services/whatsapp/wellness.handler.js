export const handleGeneralMenu = (lower) => {
    // 1. Yoga & Meditation
    if (lower === 'yoga' || lower.includes('yoga') || lower.includes('meditation')) {
        return {
            reply: {
                type: 'interactive',
                interactive: {
                    type: 'button',
                    body: {
                        text: '🧘‍♀️ *Yoga & Meditation Classes*\n\nWe offer daily live & recorded sessions guided by certified instructors.\n\nWhat would you like to do?',
                    },
                    action: {
                        buttons: [
                            { type: 'reply', reply: { id: 'yoga_schedule', title: '📅 Schedule' } },
                            { type: 'reply', reply: { id: 'yoga_join', title: '🔗 Join Class' } },
                            { type: 'reply', reply: { id: 'yoga_subscribe', title: '⭐ Subscribe' } },
                        ],
                    },
                },
            },
            nextState: 'YOGA_SUBMENU',
            escalation: false,
        };
    }

    // 2. Online Workshops
    if (lower === 'workshops' || lower.includes('workshop')) {
        return {
            reply: {
                type: 'interactive',
                interactive: {
                    type: 'button',
                    body: {
                        text: '💻 *Online Workshops*\n\nSamsara hosts online workshops on mindfulness, hormonal health & nutrition.\n\n📅 *Upcoming:*\n"Healing Through Yoga"\nNov 5, 6 PM IST\n\nWhat would you like to do?',
                    },
                    action: {
                        buttons: [
                            { type: 'reply', reply: { id: 'workshop_register', title: '✍️ Register' } },
                            { type: 'reply', reply: { id: 'workshop_list', title: '📋 List Events' } },
                            { type: 'reply', reply: { id: 'workshop_replay', title: '🎬 Replay' } },
                        ],
                    },
                },
            },
            nextState: 'WORKSHOP_SUBMENU',
            escalation: false,
        };
    }

    // 3. Mood Tracker
    if (lower === 'mood' || lower.includes('mood')) {
        return {
            reply: {
                type: 'interactive',
                interactive: {
                    type: 'button',
                    body: {
                        text: '🧠 *Mood Tracker*\n\nTrack your emotions daily to discover mood patterns.\n\nPlease select your current mood:\n\n😊 Happy | 😌 Calm | 😔 Low\n😡 Irritated | 😴 Tired\n\n💡 Your entries build your emotional wellness report 🌿',
                    },
                    action: {
                        buttons: [
                            { type: 'reply', reply: { id: 'mood_happy', title: '😊 Happy' } },
                            { type: 'reply', reply: { id: 'mood_calm', title: '😌 Calm' } },
                            { type: 'reply', reply: { id: 'mood_low', title: '😔 Low' } },
                        ],
                    },
                },
            },
            nextState: 'MOOD_TRACKER',
            escalation: false,
        };
    }

    // 4. Dosha Tracker
    if (lower === 'dosha' || lower.includes('dosha')) {
        return {
            reply: {
                type: 'interactive',
                interactive: {
                    type: 'button',
                    body: {
                        text: '🌿 *Dosha Tracker*\n\nAyurveda meets wellness!\nFind your dosha type and balance it naturally.\n\nWhat would you like to do?',
                    },
                    action: {
                        buttons: [
                            { type: 'reply', reply: { id: 'dosha_quiz', title: '📝 Quiz' } },
                            { type: 'reply', reply: { id: 'dosha_tips', title: '💡 Tips' } },
                        ],
                    },
                },
            },
            nextState: 'DOSHA_SUBMENU',
            escalation: false,
        };
    }

    // 5. Health Tracker
    if (lower === 'health' || lower.includes('health')) {
        return {
            reply: {
                type: 'interactive',
                interactive: {
                    type: 'button',
                    body: {
                        text: '💪 *Health Tracker*\n\nMonitor your sleep, weight, energy, and movement.\n\nWhat would you like to do?',
                    },
                    action: {
                        buttons: [
                            { type: 'reply', reply: { id: 'health_device', title: '📱 Connect Device' } },
                            { type: 'reply', reply: { id: 'health_goals', title: '🎯 Set Goals' } },
                            { type: 'reply', reply: { id: 'health_insights', title: '📊 View Insights' } },
                        ],
                    },
                },
            },
            nextState: 'HEALTH_SUBMENU',
            escalation: false,
        };
    }

    // 6. Period Tracker
    if (lower === 'period' || lower.includes('period')) {
        return {
            reply: {
                type: 'interactive',
                interactive: {
                    type: 'button',
                    body: {
                        text: '📅 *Period Tracker*\n\nSamsara helps predict your cycles & track symptoms.\n\nWhat would you like to do?',
                    },
                    action: {
                        buttons: [
                            { type: 'reply', reply: { id: 'period_add', title: '➕ Add Period' } },
                            { type: 'reply', reply: { id: 'period_predict', title: '🔮 Predict' } },
                            { type: 'reply', reply: { id: 'period_symptoms', title: '📝 Symptoms' } },
                        ],
                    },
                },
            },
            nextState: 'PERIOD_SUBMENU',
            escalation: false,
        };
    }

    // 7. PCOS / PCOD
    if (lower === 'pcos' || lower.includes('pcos') || lower.includes('pcod')) {
        return {
            reply: {
                type: 'interactive',
                interactive: {
                    type: 'button',
                    body: {
                        text: '🩺 *PCOS / PCOD Support*\n\nGet holistic support for PCOS management — yoga, diet, and expert guidance.\n\nWhat would you like to do?',
                    },
                    action: {
                        buttons: [
                            { type: 'reply', reply: { id: 'pcos_routine', title: '📋 Routine' } },
                            { type: 'reply', reply: { id: 'pcos_consult', title: '👩‍⚕️ Consult' } },
                        ],
                    },
                },
            },
            nextState: 'PCOS_SUBMENU',
            escalation: false,
        };
    }

    // 8. Thyroid Support
    if (lower === 'thyroid' || lower.includes('thyroid')) {
        return {
            reply: {
                type: 'interactive',
                interactive: {
                    type: 'button',
                    body: {
                        text: '🦋 *Thyroid Support*\n\nSupport your thyroid health with balanced routines.\n\nWhat would you like to do?',
                    },
                    action: {
                        buttons: [
                            { type: 'reply', reply: { id: 'thyroid_tips', title: '💡 Tips' } },
                            { type: 'reply', reply: { id: 'thyroid_diet', title: '🥗 Diet' } },
                            { type: 'reply', reply: { id: 'thyroid_track', title: '📊 Track' } },
                        ],
                    },
                },
            },
            nextState: 'THYROID_SUBMENU',
            escalation: false,
        };
    }

    // 9. Menopause Care
    if (lower === 'menopause' || lower.includes('menopause')) {
        return {
            reply: {
                type: 'interactive',
                interactive: {
                    type: 'button',
                    body: {
                        text: '🌸 *Menopause Care*\n\nSamsara provides mindfulness and nutrition programs for menopause care.\n\nWhat would you like to do?',
                    },
                    action: {
                        buttons: [
                            { type: 'reply', reply: { id: 'menopause_tips', title: '💡 Tips' } },
                            { type: 'reply', reply: { id: 'menopause_group', title: '👥 Group' } },
                            { type: 'reply', reply: { id: 'menopause_yoga', title: '🧘‍♀️ Yoga' } },
                        ],
                    },
                },
            },
            nextState: 'MENOPAUSE_SUBMENU',
            escalation: false,
        };
    }

    // 10. Diet & Nutrition
    if (lower === 'diet' || lower.includes('diet') || lower.includes('nutrition')) {
        return {
            reply: {
                type: 'interactive',
                interactive: {
                    type: 'button',
                    body: {
                        text: '🥗 *Diet & Nutrition*\n\nNutrition personalized for your body & cycle.\n\nWhat would you like to do?',
                    },
                    action: {
                        buttons: [
                            { type: 'reply', reply: { id: 'diet_plan', title: '📋 Plan' } },
                            { type: 'reply', reply: { id: 'diet_recipes', title: '🍳 Recipes' } },
                            { type: 'reply', reply: { id: 'diet_coach', title: '👨‍🍳 Coach' } },
                        ],
                    },
                },
            },
            nextState: 'DIET_SUBMENU',
            escalation: false,
        };
    }

    // Catch-all is handled by caller or fallback
    return null;
};

export const handleWellnessSubmenus = (session, lower) => {
    // YOGA_SUBMENU
    if (session.currentState === 'YOGA_SUBMENU') {
        if (lower === 'yoga_schedule' || lower.includes('schedule')) {
            return {
                reply: '📅 *Upcoming Yoga & Meditation Classes*\n\n🌅 *Morning Session*\n• Time: 6:00 AM - 7:00 AM IST\n• Type: Hatha Yoga\n• Instructor: Priya Sharma\n\n🌆 *Evening Session*\n• Time: 6:30 PM - 7:30 PM IST\n• Type: Vinyasa Flow\n• Instructor: Arjun Patel\n\n🧘‍♀️ *Meditation Session*\n• Time: 8:00 PM - 8:30 PM IST\n• Type: Guided Meditation\n• Instructor: Dr. Meera Iyer\n\nType "Join" to get the class link or "Menu" to return.',
                nextState: 'YOGA_SUBMENU',
                escalation: false,
            };
        }
        if (lower === 'yoga_join' || lower.includes('join')) {
            return {
                reply: '🔗 *Join Live Class*\n\n✅ Click the link below to join our next session:\n👉 https://meet.samsara.com/yoga-live\n\n📱 Meeting ID: 123-456-789\n🔑 Passcode: WELLNESS\n\n💡 *Tips:*\n• Join 5 minutes early\n• Keep your mat ready\n• Ensure stable internet\n\nType "Schedule" to view timings or "Menu" to return.',
                nextState: 'YOGA_SUBMENU',
                escalation: false,
            };
        }
        if (lower === 'yoga_subscribe' || lower.includes('subscribe')) {
            return {
                reply: '⭐ *Premium Yoga Subscription*\n\n🎁 *Benefits:*\n✅ Unlimited live classes\n✅ Access to 500+ recorded sessions\n✅ Personalized yoga plans\n✅ 1-on-1 instructor consultation\n✅ Exclusive meditation library\n\n💰 *Pricing:*\n• Monthly: ₹999/month\n• Quarterly: ₹2,499 (Save 17%)\n• Yearly: ₹7,999 (Save 33%)\n\n🔗 Subscribe now: https://samsara.com/subscribe\n\nType "Menu" to return to main menu.',
                nextState: 'YOGA_SUBMENU',
                escalation: false,
            };
        }
        return {
            reply: 'Please select one of the options: Schedule, Join, or Subscribe.\n\nType "Menu" to return to main menu.',
            nextState: 'YOGA_SUBMENU',
            escalation: false,
        };
    }

    // WORKSHOP_SUBMENU
    if (session.currentState === 'WORKSHOP_SUBMENU') {
        if (lower === 'workshop_register' || lower.includes('register')) {
            return {
                reply: '✍️ *Register for Workshop*\n\n📅 *Healing Through Yoga*\n🗓 Date: November 5, 2024\n🕕 Time: 6:00 PM - 8:00 PM IST\n👨‍🏫 Facilitator: Dr. Anjali Desai\n\n✨ *What You\'ll Learn:*\n• Yoga for stress relief\n• Breathing techniques\n• Mind-body connection\n• Q&A with expert\n\n🎟 *Registration Fee:* ₹499\n(Free for premium members)\n\n🔗 Register now: https://samsara.com/workshops/healing-yoga\n\nType "List" to see more events or "Menu" to return.',
                nextState: 'WORKSHOP_SUBMENU',
                escalation: false,
            };
        }
        if (lower === 'workshop_list' || lower.includes('list')) {
            return {
                reply: '📋 *Upcoming Workshops*\n\n1️⃣ *Healing Through Yoga*\n   📅 Nov 5, 6 PM IST\n   💰 ₹499\n\n2️⃣ *Hormonal Balance & Nutrition*\n   📅 Nov 12, 7 PM IST\n   💰 ₹599\n\n3️⃣ *Mindfulness for Modern Life*\n   📅 Nov 19, 5 PM IST\n   💰 ₹449\n\n4️⃣ *PCOS Management Workshop*\n   📅 Nov 26, 6:30 PM IST\n   💰 ₹699\n\n5️⃣ *Ayurvedic Wellness Basics*\n   📅 Dec 3, 7 PM IST\n   💰 ₹549\n\n🎁 *Premium members get 50% off all workshops!*\n\nType "Register" to join or "Menu" to return.',
                nextState: 'WORKSHOP_SUBMENU',
                escalation: false,
            };
        }
        if (lower === 'workshop_replay' || lower.includes('replay')) {
            return {
                reply: '🎬 *Past Workshop Replays*\n\n📺 *Available Now:*\n\n1️⃣ Yoga for Beginners\n   ⏱ Duration: 90 mins\n   🔗 Watch: https://samsara.com/replay/yoga-beginners\n\n2️⃣ Managing Stress Naturally\n   ⏱ Duration: 75 mins\n   🔗 Watch: https://samsara.com/replay/stress-management\n\n3️⃣ Nutrition for Women\'s Health\n   ⏱ Duration: 120 mins\n   🔗 Watch: https://samsara.com/replay/nutrition\n\n4️⃣ Meditation Masterclass\n   ⏱ Duration: 60 mins\n   🔗 Watch: https://samsara.com/replay/meditation\n\n💡 *Note:* Premium members have unlimited access to all replays.\n\nType "List" for upcoming events or "Menu" to return.',
                nextState: 'WORKSHOP_SUBMENU',
                escalation: false,
            };
        }
        return {
            reply: 'Please select Register, List Events, or Replay.\n\nType "Menu" to return to main menu.',
            nextState: 'WORKSHOP_SUBMENU',
            escalation: false,
        };
    }

    // MOOD_TRACKER
    if (session.currentState === 'MOOD_TRACKER') {
        if (lower.includes('history') || lower.includes('report')) {
            return {
                reply: '📅 *Your Mood History*\n\nHere is your deeper insight:\n• Mon: 😊 Happy\n• Tue: 😌 Calm\n• Wed: 😔 Low\n• Thu: 😊 Happy\n• Fri: 😴 Tired\n\n💡 *Pattern:* You tend to feel low midweek. Try a 5-min breathing exercise on Wednesdays!\n\nType "Menu" to return.',
                nextState: 'MOOD_TRACKER',
                escalation: false,
            };
        }
        if (lower.includes('support') || lower.includes('talk')) {
            return {
                reply: 'Connecting you to a compassionate listener... 💙\n\nIt’s okay not to be okay. Someone will be with you shortly.',
                nextState: 'ESCALATED',
                escalation: true,
            };
        }

        let moodResponse = '';
        if (lower.includes('happy')) moodResponse = 'That’s wonderful! 😊 Keep that positivity flowing. Maybe journal what made you happy today?';
        else if (lower.includes('calm')) moodResponse = 'Serenity is a superpower 🌿. Enjoy this peaceful state.';
        else if (lower.includes('low') || lower.includes('sad')) moodResponse = 'I hear you. 💙 It’s okay to feel low sometimes. Be gentle with yourself.';
        else if (lower.includes('irritated') || lower.includes('angry')) moodResponse = 'Take a deep breath. 🌬️ Would you like a quick 2-minute calming exercise?';
        else if (lower.includes('tired')) moodResponse = 'Rest is productive too. 😴 Listen to your body and take it slow today.';
        else moodResponse = 'Thank you for sharing. Tracking your mood helps you understand yourself better.';

        return {
            reply: `${moodResponse}\n\n💡 *Wellness Tip:*\n"Feelings are visitors; let them come and go." - Rumi\n\nTo view your history, type "History".\nIf you need to talk to someone, type "Support".\n\nType "Menu" to return.`,
            nextState: 'MOOD_TRACKER',
            escalation: false,
        };
    }

    // PLACEHOLDERS (Dosha, Health, Period, PCOS, Thyroid, Menopause, Diet)
    const simpleSubmenus = {
        'DOSHA_SUBMENU': ['quiz', 'tips'],
        'HEALTH_SUBMENU': ['device', 'goals', 'insights'],
        'PERIOD_SUBMENU': ['add', 'predict', 'symptoms'],
        'PCOS_SUBMENU': ['routine', 'consult'],
        'THYROID_SUBMENU': ['tips', 'diet', 'track'],
        'MENOPAUSE_SUBMENU': ['tips', 'group', 'yoga'],
        'DIET_SUBMENU': ['plan', 'recipes', 'coach']
    };

    if (simpleSubmenus[session.currentState]) {
        const keywords = simpleSubmenus[session.currentState];
        const match = keywords.find(k => lower.includes(k) || lower.includes(session.currentState.split('_')[0].toLowerCase() + '_' + k));
        if (match) {
            return {
                reply: `You are in ${match.charAt(0).toUpperCase() + match.slice(1)}.\n\nType "Menu" to return to main menu.`,
                nextState: session.currentState,
                escalation: false
            }
        }
        // Fallback
        return {
            reply: `Please select an option or Type "Menu" to return.`,
            nextState: session.currentState,
            escalation: false,
        }
    }

    return null;
};
