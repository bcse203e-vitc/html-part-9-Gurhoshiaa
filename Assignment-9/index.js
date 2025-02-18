function openForm(service) {
    document.getElementById("service").value = service;
    document.getElementById("appointmentModal").style.display = "flex";
}

function closeForm() {
    document.getElementById("appointmentModal").style.display = "none";
}

function validateForm() {
    let valid = true;
    const now = new Date();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const dateTime = new Date(document.getElementById("dateTime").value);
    const terms = document.getElementById("terms").checked;

    if (name === "") {
        document.getElementById("nameError").classList.remove("hidden");
        valid = false;
    } else {
        document.getElementById("nameError").classList.add("hidden");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById("emailError").classList.remove("hidden");
        valid = false;
    } else {
        document.getElementById("emailError").classList.add("hidden");
    }

    if (!/^\d{10}$/.test(phone)) {
        document.getElementById("phoneError").classList.remove("hidden");
        valid = false;
    } else {
        document.getElementById("phoneError").classList.add("hidden");
    }

    if (dateTime <= now) {
        document.getElementById("dateTimeError").classList.remove("hidden");
        valid = false;
    } else {
        document.getElementById("dateTimeError").classList.add("hidden");
    }

    if (!terms) {
        document.getElementById("termsError").classList.remove("hidden");
        valid = false;
    } else {
        document.getElementById("termsError").classList.add("hidden");
    }

    return valid;
}

function submitForm() {
    if (validateForm()) {
        const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        const appointment = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            service: document.getElementById("service").value,
            dateTime: document.getElementById("dateTime").value,
            requests: document.getElementById("requests").value,
            status: "Pending"
        };
        appointments.push(appointment);
        localStorage.setItem("appointments", JSON.stringify(appointments));
        displayAppointments();
        closeForm();
        alert(`Thank you, ${appointment.name}! Your appointment for ${appointment.service} on ${appointment.dateTime} is confirmed.`);
    }
}

function displayAppointments() {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const container = document.getElementById("appointments");
    container.innerHTML = "";
    if (appointments.length > 0) {
        let content = `<table>
            <tr><th>Name</th><th>Service</th><th>Date & Time</th><th>Status</th><th>Actions</th></tr>`;
        appointments.forEach((appointment, index) => {
            content += `
            <tr>
                <td>${appointment.name}</td>
                <td>${appointment.service}</td>
                <td>${appointment.dateTime}</td>
                <td>${appointment.status}</td>
                <td><button onclick="cancelAppointment(${index})">Cancel</button></td>
            </tr>`;
        });
        content += `</table>`;
        container.innerHTML = content;
    }
}

function cancelAppointment(index) {
    const appointments = JSON.parse(localStorage.getItem("appointments"));
    if (confirm("Are you sure you want to cancel this appointment?")) {
        appointments.splice(index, 1);
        localStorage.setItem("appointments", JSON.stringify(appointments));
        displayAppointments();
    }
}

window.onload = displayAppointments;