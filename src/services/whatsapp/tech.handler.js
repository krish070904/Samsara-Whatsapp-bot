export const handleTechMenu = (lower) => {
    // 1. App Not Loading
    if (lower === 'app_issue' || lower.includes('app')) {
        return {
            reply: '🛠️ *App Not Loading*\n\nTry these quick fixes:\n\n✅ Close and reopen the app\n✅ Check your internet connection\n✅ Clear cache or reinstall Samsara\n\n💡 *Still not working?*\nType "Support" to connect with a technician.\n\nOr type "Menu" to return to main menu.',
            nextState: 'TECH_APP_ISSUE',
            escalation: false,
        };
    }

    // 2. Device Not Showing
    if (lower === 'device_issue' || lower.includes('device')) {
        return {
            reply: '🔌 *Device Not Showing*\n\nIf your device isn\'t visible:\n\n1️⃣ Ensure it\'s powered on & connected\n2️⃣ Go to Settings → Devices → Refresh\n3️⃣ Still missing? Type "Report Device Issue"\n\nOr type "Menu" to return to main menu.',
            nextState: 'TECH_DEVICE_ISSUE',
            escalation: false,
        };
    }

    // 3. Login/Password
    if (lower === 'login_issue' || lower.includes('login') || lower.includes('password')) {
        return {
            reply: '🔐 *Login / Password Issues*\n\nTo reset your password:\n\n➡️ Visit cloud.samsara.com → Forgot Password\n\n💡 *Can\'t access your account?*\nType "Agent" for live help.\n\nOr type "Menu" to return to main menu.',
            nextState: 'TECH_LOGIN_ISSUE',
            escalation: false,
        };
    }

    // 4. Firmware Update
    if (lower === 'firmware' || lower.includes('firmware') || lower.includes('update')) {
        return {
            reply: '🔄 *Firmware / Updates*\n\nDevices update automatically, but you can check manually:\n\n📱 App → Settings → About → Firmware Version\n\n💡 *Version outdated?*\nType "Update" to request assistance.\n\nOr type "Menu" to return to main menu.',
            nextState: 'TECH_FIRMWARE_ISSUE',
            escalation: false,
        };
    }

    // 5. Other Issues (Auto-escalate prompt)
    if (lower === 'other_tech' || lower.includes('other')) {
        return {
            reply: '🔧 *Other Issues*\n\nPlease describe your issue briefly.\n\n💬 Our support team will reach out within 24 hours.\n\n📝 Type your issue description now, or "Menu" to return.',
            nextState: 'TECH_OTHER_ISSUE',
            escalation: false,
        };
    }

    return null;
};

export const handleTechSubmenus = (session, lower) => {
    // App Issue Follow-up
    if (session.currentState === 'TECH_APP_ISSUE') {
        if (lower.includes('support') || lower.includes('technician') || lower.includes('help')) {
            return {
                reply: 'Connecting you with a technical support specialist... 🛠️\n\nSomeone will assist you shortly.',
                nextState: 'ESCALATED',
                escalation: true,
            };
        }
        return {
            reply: 'Type "Support" to connect with a technician, or "Menu" to return to main menu.',
            nextState: 'TECH_APP_ISSUE',
            escalation: false,
        };
    }

    // Device Issue Follow-up
    if (session.currentState === 'TECH_DEVICE_ISSUE') {
        if (lower.includes('report') || lower.includes('device issue') || lower.includes('help')) {
            return {
                reply: 'Reporting your device issue to our technical team... 🔌\n\nA specialist will contact you shortly to resolve this.',
                nextState: 'ESCALATED',
                escalation: true,
            };
        }
        return {
            reply: 'Type "Report Device Issue" to escalate, or "Menu" to return to main menu.',
            nextState: 'TECH_DEVICE_ISSUE',
            escalation: false,
        };
    }

    // Login Issue Follow-up
    if (session.currentState === 'TECH_LOGIN_ISSUE') {
        if (lower.includes('agent') || lower.includes('help') || lower.includes('support')) {
            return {
                reply: 'Connecting you with a live agent... 🔐\n\nThey will help you regain access to your account.',
                nextState: 'ESCALATED',
                escalation: true,
            };
        }
        return {
            reply: 'Type "Agent" for live help, or "Menu" to return to main menu.',
            nextState: 'TECH_LOGIN_ISSUE',
            escalation: false,
        };
    }

    // Firmware Issue Follow-up
    if (session.currentState === 'TECH_FIRMWARE_ISSUE') {
        if (lower.includes('update') || lower.includes('assistance') || lower.includes('help')) {
            return {
                reply: 'Requesting firmware update assistance... 🔄\n\nOur technical team will help you update your device.',
                nextState: 'ESCALATED',
                escalation: true,
            };
        }
        return {
            reply: 'Type "Update" to request assistance, or "Menu" to return to main menu.',
            nextState: 'TECH_FIRMWARE_ISSUE',
            escalation: false,
        };
    }

    // Other Issue Follow-up (Capture & Escalate)
    if (session.currentState === 'TECH_OTHER_ISSUE') {
        if (lower === 'menu') return null; // Let router handle 'menu'

        return {
            reply: '✅ *Issue Received*\n\nThank you for describing your issue. Our support team has been notified.\n\n📧 You will receive a response within 24 hours.\n\nType "Menu" to return to main menu.',
            nextState: 'ESCALATED',
            escalation: true,
        };
    }

    return null;
};
