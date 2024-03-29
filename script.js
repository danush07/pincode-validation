class PincodeValidator extends HTMLElement {
  constructor() {
    super();
    this.data = {
      deliveryLocations: [
        {
          pincode: "110001",
          estimatedDeliveryDays: 2,
          locationName: "Connaught Place, Delhi",
        },
        {
          pincode: "400001",
          estimatedDeliveryDays: 3,
          locationName: "Fort, Mumbai",
        },
        {
          pincode: "700001",
          estimatedDeliveryDays: 4,
          locationName: "Dalhousie Square, Kolkata",
        },
        {
          pincode: "600001",
          estimatedDeliveryDays: 3,
          locationName: "Parrys Corner, Chennai",
        },
        {
          pincode: "500001",
          estimatedDeliveryDays: 2,
          locationName: "Afzal Gunj, Hyderabad",
        },
        {
          pincode: "110020",
          estimatedDeliveryDays: 5,
          locationName: "Hauz Khas, Delhi",
        },
        {
          pincode: "400020",
          estimatedDeliveryDays: 4,
          locationName: "Worli, Mumbai",
        },
        {
          pincode: "700020",
          estimatedDeliveryDays: 3,
          locationName: "Salt Lake City, Kolkata",
        },
        {
          pincode: "600020",
          estimatedDeliveryDays: 2,
          locationName: "Anna Nagar, Chennai",
        },
        {
          pincode: "500020",
          estimatedDeliveryDays: 4,
          locationName: "Banjara Hills, Hyderabad",
        },
      ],
    };
  }

  connectedCallback() {
    this.checkPinCode();
  }

  validatePincode(pincode) {
    return this.data.deliveryLocations.some(
      (location) => location.pincode === pincode
    );
  }

  getDeliveryLocation(pincode) {
    return this.data.deliveryLocations.find(
      (location) => location.pincode === pincode
    );
  }

  formatDate(date) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  checkPinCode() {
    const form = this.querySelector("#pincodeForm");
    const pincodeInput = form.querySelector("input");
    const errorElement = this.querySelector("#error");
    const deliveryInfoElement = this.querySelector("#deliveryInfo");

    pincodeInput.addEventListener("click", () => {
      errorElement.textContent = "";
    });

    pincodeInput.addEventListener("input", () => {
      pincodeInput.value = pincodeInput.value.replace(/\D/g, "");
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const pincode = pincodeInput.value;

      if (pincode.length < 6) {
        errorElement.textContent = "Pincode must be at least 6 characters.";
        deliveryInfoElement.textContent = "";
        return;
      }

      const isValid = this.validatePincode(pincode);

      if (isValid) {
        const deliveryLocation = this.getDeliveryLocation(pincode);
        if (deliveryLocation) {
          const currentDate = new Date();
          const estimatedDeliveryDate = new Date(currentDate);
          estimatedDeliveryDate.setDate(
            currentDate.getDate() + deliveryLocation.estimatedDeliveryDays
          );

          const formattedDeliveryDate = this.formatDate(estimatedDeliveryDate);
          deliveryInfoElement.textContent = `Your order will be delivered by ${formattedDeliveryDate}.`;
          errorElement.textContent = "";
        }
      } else {
        errorElement.textContent = "Out of service area.";
        deliveryInfoElement.textContent = "";
      }
    });
  }

}

customElements.define("pincode-validator", PincodeValidator);