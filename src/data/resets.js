const donation = {
    monthly: false,
    project_id: null,
    project: null,
    donation_type_id:'',
    donation_type: null,
    amount: null,
    fixed_amount: null,
    qty: 1,
}

const donor = {
    title: null,
    first_name: null,
    last_name: null,
    address_line_1: null,
    address_line_2: null,
    address_line_3: null,
    city: null,
    post_code: null,
    country: null,
    email: null,
    phone: null,
    reason: null,
    notes: null,
    gift_aid: 0,
    payment_type: 'credit',
    date: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
    paper_copy: false,
    admin_fee: false,
    communication_preferences: [],
    agree: 0
}

const admin_fee = {
    category_id: 0,
    project_id: 0,
    donation_type_id:'',
    amount: null,
    monthly: false,
    fix_amount: 5,
    qty: 1,
    totalAmount: null,
    project: null
}

const paper_copy = {
    category_id: 0,
    project_id: 0,
    donation_type_id:'',
    amount: null,
    monthly: false,
    fix_amount: 5,
    qty: 1,
    totalAmount: null,
    project: null
}


export { donation,donor };
