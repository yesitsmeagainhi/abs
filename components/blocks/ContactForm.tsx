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
          action="/thank-you"
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

          <label className="flex items-start gap-2 text-sm">
            <input required type="checkbox" name="terms" className="mt-1" />
            <span>I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Terms &amp; Conditions</a></span>
          </label>

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
