// ContactForm block component
export type ContactFormProps = {
  template : "contactForm";
  heading ?: string;
};

export default function ContactForm({ heading = "Enquire Now" }: ContactFormProps) {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-lg mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{heading}</h2>

        <form
          name="contact"
          method="POST"
          data-netlify="true"
          className="grid gap-5"
        >
          <input type="hidden" name="form-name" value="contact" />

          <input
            name="name"
            required
            placeholder="Full name"
            className="border rounded-lg px-4 py-3"
          />
          <input
            name="phone"
            required
            placeholder="Phone"
            className="border rounded-lg px-4 py-3"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white font-medium py-3 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
