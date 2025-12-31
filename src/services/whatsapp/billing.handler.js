export const handleBillingMenu = (lower) => {
    // 1. Update Payment Method
    if (lower === 'update_payment' || lower.includes('update') || lower.includes('payment method')) {
        return {
            reply: '💳 *Update Payment Method*\n\nTo update your card or billing info:\n\n📱 Go to App → Dashboard → Billing → Payment Methods → Edit\n\n💡 You can add or remove cards anytime.\n\nType "Menu" to return to main menu.',
            nextState: 'BILLING_MENU',
            escalation: false,
        };
    }

    // 2. Download Invoice
    if (lower === 'download_invoice' || lower.includes('invoice') || lower.includes('download')) {
        return {
            reply: '📄 *View / Download Invoice*\n\nYou can view all past invoices:\n\n📱 App → Billing → Invoices\n\n💡 To receive a PDF copy by email, type "Email Invoice".\n\nOr type "Menu" to return to main menu.',
            nextState: 'BILLING_INVOICE',
            escalation: false,
        };
    }

    // 3. Payment Issues
    if (lower === 'payment_failed' || lower.includes('payment') || lower.includes('failed') || lower.includes('double')) {
        return {
            reply: '💸 *Payment Failed / Double Charge*\n\nWe\'re sorry for the inconvenience 🙏\n\nPlease provide:\n1️⃣ Payment date\n2️⃣ Last 4 digits of your card\n3️⃣ Amount charged\n\n📧 Our billing team will review and respond within 24 hours.\n\nType your details now, or "Menu" to return.',
            nextState: 'BILLING_PAYMENT_ISSUE',
            escalation: false,
        };
    }

    // 4. Subscription / Cancellation
    if (lower === 'subscription' || lower.includes('subscription') || lower.includes('cancel')) {
        return {
            reply: '🔄 *Subscription / Cancellation*\n\nTo cancel or modify your subscription, contact:\n\n👤 Your Samsara Account Manager\n📧 Email: billing@samsara.com\n\n💡 Would you like me to send a quick cancel request form link?\n\nType "Yes" for the form, or "Menu" to return.',
            nextState: 'BILLING_SUBSCRIPTION',
            escalation: false,
        };
    }

    // 5. Talk to Billing Team
    if (lower === 'billing_team' || lower.includes('billing team')) {
        return {
            reply: 'Connecting you to our billing team... 💳\nA specialist will assist you shortly.',
            nextState: 'ESCALATED',
            escalation: true,
        };
    }

    return null;
};

export const handleBillingSubmenus = (session, lower) => {
    // Invoice Email Request
    if (session.currentState === 'BILLING_INVOICE') {
        if (lower.includes('email') || lower.includes('send')) {
            return {
                reply: '✅ *Invoice Email Sent*\n\nA PDF copy of your latest invoice has been sent to your registered email address.\n\n📧 Please check your inbox (and spam folder).\n\nType "Menu" to return to main menu.',
                nextState: 'BILLING_MENU',
                escalation: false,
            };
        }
        return {
            reply: 'Type "Email Invoice" to receive a PDF copy, or "Menu" to return to main menu.',
            nextState: 'BILLING_INVOICE',
            escalation: false,
        };
    }

    // Payment Issue Details
    if (session.currentState === 'BILLING_PAYMENT_ISSUE') {
        if (lower === 'menu') return null;

        return {
            reply: '✅ *Details Received*\n\nThank you for providing the information. Your payment issue has been escalated to our billing team.\n\n📧 You will receive a response within 24 hours.\n💳 We will resolve this as quickly as possible.\n\nType "Menu" to return to main menu.',
            nextState: 'ESCALATED',
            escalation: true,
        };
    }

    // Subscription Form Request
    if (session.currentState === 'BILLING_SUBSCRIPTION') {
        if (lower.includes('yes') || lower.includes('send') || lower.includes('form')) {
            return {
                reply: '📋 *Cancel Request Form*\n\nHere\'s the link to submit your cancellation request:\n\n🔗 https://samsara.com/cancel-subscription\n\nFill out the form and our team will process your request within 2 business days.\n\n📧 You\'ll receive a confirmation email once processed.\n\nType "Menu" to return to main menu.',
                nextState: 'BILLING_MENU',
                escalation: false,
            };
        }
        return {
            reply: 'Type "Yes" to receive the cancel request form link, or "Menu" to return to main menu.',
            nextState: 'BILLING_SUBSCRIPTION',
            escalation: false,
        };
    }

    return null;
};
