let current_donation = {
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

let form = {
    first_name: null,
    last_name: null,
    address_line_1: null,
    address_line_2: null,
    city: null,
    post_code: null,
    country: 0,
    email: null,
    phone: null,
    reason: null,
    notes: null,
    gift_aid: 0,
    payment_type: 'Credit Card',
    date: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
    paper_copy: false,
    admin_fee_cover: false,
}

let admin_fee = {
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

let paper_copy = {
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


export { current_donation,form,admin_fee,paper_copy };
