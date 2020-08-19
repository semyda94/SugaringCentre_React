let hostId = 'smtp_server';
let contactTemplateId = 'template_IKJA9rM8';
let newBookingTemplateId = 'newBooking';

const send = (templateId, params) => {
    window.emailjs.send(
        hostId,
        templateId,
        params
        ).then(res => {
          console.log('Email successfully sent!')
        })
        // Handle errors here however you like, or use a React error boundary
        .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
}

const EmailService =  {
     ContactEmail(name, email, message) {
        send(contactTemplateId, {message_html: message, from_name: name, reply_to: email});
    },
    NewBookingEmail(email, date, time ) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formatedDate = date.toLocaleDateString(undefined, options);
         
        send(newBookingTemplateId, {email_to: email, date: formatedDate, time: time});
    }
}

export { EmailService }