import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";

function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "⚠️ Full name is required.";
  } else if (form.name.trim().length < 2) {
    errors.name = "⚠️ Name must be at least 2 characters.";
  }

  if (!form.phone.trim()) {
    errors.phone = "⚠️ TeleBirr phone number is required.";
  } else if (!/^09\d{8}$/.test(form.phone.trim())) {
    errors.phone =
      "⚠️ Invalid phone number. Enter a valid TeleBirr number, e.g. 0912345678.";
  }

  if (!form.deliveryArea.trim()) {
    errors.deliveryArea = "⚠️ Delivery area is required.";
  }

  return errors;
}

function Checkout() {
  const navigate = useNavigate();

  const items = useCartStore((state) => state.items);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    deliveryArea: "",
    notes: "",
  });

  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const deliveryAreaRef = useRef(null);

  const errors = validate(form);

  const total = items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  function focusFirstError(validationErrors) {
    const firstError =
      Object.keys(validationErrors)[0];

    if (firstError === "name") {
      nameRef.current?.focus();
    } else if (firstError === "phone") {
      phoneRef.current?.focus();
    } else if (firstError === "deliveryArea") {
      deliveryAreaRef.current?.focus();
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setSubmitError("");
  }

  function handleBlur(event) {
    const { name } = event.target;

    setTouched((currentTouched) => ({
      ...currentTouched,
      [name]: true,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitting) {
      return;
    }

    const validationErrors = validate(form);

    setTouched({
      name: true,
      phone: true,
      deliveryArea: true,
      notes: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      focusFirstError(validationErrors);
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          const requestSuccessful = true;

          if (requestSuccessful) {
            resolve();
          } else {
            reject(
              new Error(
                "Order could not be submitted. Please try again."
              )
            );
          }
        }, 1500);
      });

      alert(
        `Order placed successfully! 🎉 Total: ETB ${total}`
      );

      navigate("/menu");
    } catch (error) {
      setSubmitError(
        error.message ||
          "Something went wrong. Please try again."
      );

      focusFirstError(validate(form));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1>Checkout</h1>

      <p>Complete your order.</p>

      {submitError && (
        <div role="alert">
          ⚠️ {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="name">
            Full Name
          </label>

          <br />

          <input
            ref={nameRef}
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your name"
            aria-invalid={
              touched.name &&
              Boolean(errors.name)
            }
            aria-describedby={
              touched.name && errors.name
                ? "name-error"
                : undefined
            }
          />

          {touched.name && errors.name && (
            <p
              id="name-error"
              role="alert"
            >
              {errors.name}
            </p>
          )}
        </div>

        <br />

        <div>
          <label htmlFor="phone">
            TeleBirr Phone
          </label>

          <br />

          <input
            ref={phoneRef}
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="09xxxxxxxx"
            aria-invalid={
              touched.phone &&
              Boolean(errors.phone)
            }
            aria-describedby={
              touched.phone && errors.phone
                ? "phone-error"
                : undefined
            }
          />

          {touched.phone && errors.phone && (
            <p
              id="phone-error"
              role="alert"
            >
              {errors.phone}
            </p>
          )}
        </div>

        <br />

        <div>
          <label htmlFor="deliveryArea">
            Delivery Area
          </label>

          <br />

          <input
            ref={deliveryAreaRef}
            id="deliveryArea"
            name="deliveryArea"
            type="text"
            value={form.deliveryArea}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your delivery area"
            aria-invalid={
              touched.deliveryArea &&
              Boolean(errors.deliveryArea)
            }
            aria-describedby={
              touched.deliveryArea &&
              errors.deliveryArea
                ? "delivery-area-error"
                : undefined
            }
          />

          {touched.deliveryArea &&
            errors.deliveryArea && (
              <p
                id="delivery-area-error"
                role="alert"
              >
                {errors.deliveryArea}
              </p>
            )}
        </div>

        <br />

        <div>
          <label htmlFor="notes">
            Notes (optional)
          </label>

          <br />

          <textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Any special delivery instructions?"
          />
        </div>

        <br />

        <p>
          <strong>
            Total: ETB {total}
          </strong>
        </p>

        <button
          type="submit"
          disabled={submitting}
        >
          {submitting
            ? "Submitting..."
            : `Place Order — ETB ${total}`}
        </button>
      </form>
    </div>
  );
}

export default Checkout;