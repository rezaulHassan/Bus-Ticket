// make a function to get the selected seats
const addToInvoice = (selectedSeats) => {
    // get the seat list by querySelector
    const seatList = document.querySelector("#seatList");
    // get the totalSeats
    const totalSeats = document.querySelector("#totalSeats");
    seatList.innerHTML = '';
    selectedSeats.forEach(seatId => {
        const seatEntry = document.createElement('div');
        seatEntry.classList.add('flex', 'justify-between', 'gap-10', 'py-3');
        seatEntry.innerHTML = `
            <p class="w-24">${seatId}</p>
            <p class="w-24">Economy</p>
            <p class="w-24">550</p>
        `;
        seatList.appendChild(seatEntry);
    });
    totalSeats.innerHTML = selectedSeats.length;
    generateTotal(selectedSeats)
};

 
const generateTotal = (selectedSeats) => {
    const normalTotal = document.querySelector("#normalTotal");
    const grandTotal = document.querySelector("#grandTotal");
    const selectedSeatsLength = selectedSeats.length;
    let total = selectedSeatsLength * 550;
    normalTotal.innerHTML = `BDT ${total}`
    grandTotal.innerHTML = `BDT ${total}`
    couponCheck(total, selectedSeatsLength);
};


// get a function to active coupon section 

const couponCheck = (total, selectedSeatsLength) => {
    const coupon = ["NEW15", "Couple 20"];
    const couponInput = document.querySelector("#couponInput");
    const couponApply = document.querySelector("#couponApply");
    if (selectedSeatsLength === 4) {
        couponInput.addEventListener("input",  (event) => {
            const inputValue = event.target.value;
            if (inputValue === coupon[0] || inputValue === coupon[1]) {
                couponApply.classList.remove("btn-disabled");
                couponApply.addEventListener('click', () => {
                    const couponBody = document.querySelector("#couponBody");
                    const grandTotal = document.querySelector("#grandTotal");
                    couponBody.classList.add('hidden')
                    if (inputValue === coupon[0]) {
                        grandTotal.innerHTML = `BDT ${total - (total * 15/100)}`;
                    } else {
                        grandTotal.innerHTML = `BDT ${total - (total * 20/100)}`;
                    }
                });
            } else {
                couponApply.classList.add("btn-disabled");
            }
        });
    }
};

// get a function for initializing 

const initializeSeatSelection = () => {
    const seatButtons = document.querySelectorAll(".seat-btn");
    const seatLeft = document.querySelector("#seatLeft");
    const submit = document.querySelector("#submit");

    let selectedSeats = [];

    seatButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const seatNumber = e.target.innerHTML;
            if (!selectedSeats.includes(seatNumber)) {
                if (selectedSeats.length < 4) {
                    e.target.classList.remove("bg-sectionBg", "text-seatText");
                    e.target.classList.add("bg-gr", "text-[#FFFF]");
                    selectedSeats.push(seatNumber);
                    submit.classList.remove('btn-disabled')
                } else {
                    alert("impossible to choose more than 4 seats!!!");
                }
            } else {
                e.target.classList.remove("bg-gr", "text-[#FFFF]");
                e.target.classList.add("bg-sectionBg", "text-seatText");
                const index = selectedSeats.indexOf(seatNumber);
                if (index > -1) {
                    selectedSeats.splice(index, 1);
                }
            }
            // console.log("Selected seats:", selectedSeats);
            seatLeft.innerHTML = 24 - selectedSeats.length;
            addToInvoice(selectedSeats)
        });
    });
};

document.addEventListener("DOMContentLoaded", initializeSeatSelection);
