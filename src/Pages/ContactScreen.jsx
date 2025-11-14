import React, { useState } from "react";

/**
 * Page Contact — maquette front only
 * - 2 colonnes : Infos (gauche) + Formulaire (droite)
 * - Validation légère en front
 * - "Faux" submit qui affiche un message de succès
 */
const ContactScreen = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    subject: "Informations",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // "success" | "error" | null

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  // Mini validation "maquette"
  const validate = () => {
    const newErrors = {};
    if (!form.fullname.trim()) newErrors.fullname = "Nom et prénom requis.";
    if (!form.email.trim()) {
      newErrors.email = "Email requis.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Email invalide.";
    }
    if (!form.message.trim()) newErrors.message = "Message requis.";
    if (!form.consent) newErrors.consent = "Veuillez accepter la politique de contact.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) {
      setStatus("error");
      return;
    }

    // Pas de back-end : on simule l'envoi
    console.log("Form data (mock):", form);
    setStatus("success");
    // reset du formulaire pour la maquette
    setForm({
      fullname: "",
      email: "",
      phone: "",
      subject: "Informations",
      message: "",
      consent: false,
    });

    // on efface le message après 5s
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <div className="min-h-screen bg-[#FFE6A7]/10">
      <header className="py-10">
        <h1 className="text-4xl font-bold text-center text-[#432818]">Le Bon Café — Contact</h1>
        <p className="text-center text-[#432818]/80 mt-2">
          Une question sur nos cafés, vos commandes ou un partenariat ? Écrivez-nous ☕
        </p>
      </header>

      {/* Message de statut */}
      {status === "success" && (
        <div className="mx-auto mb-6 max-w-3xl rounded-xl bg-green-50 px-4 py-3 text-green-800 shadow">
          Merci ! Votre message a été envoyé (maquette). Nous vous répondrons bientôt.
        </div>
      )}
      {status === "error" && Object.keys(errors).length > 0 && (
        <div className="mx-auto mb-6 max-w-3xl rounded-xl bg-red-50 px-4 py-3 text-red-800 shadow">
          Oups, vérifiez les champs en rouge.
        </div>
      )}

      <main className="mx-auto grid max-w-6xl gap-8 px-4 pb-20 md:grid-cols-2">
        {/* Colonne Infos */}
       <section
          aria-labelledby="contact-form-title"
          className="rounded-2xl bg-[#432818]/10 p-6 shadow-lg hover:shadow-xl transition-shadow"
        >
           <h2 id="contact-info-title" className="text-xl font-semibold text-[#432818]">
            Nos informations
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <p className="font-medium text-[#432818]">Adresse</p>
              <p className="text-[#432818]/80">Le Bon Café, 12 rue du Goût, 44000 Nantes</p>
            </div>
            <div>
              <p className="font-medium text-[#432818]">Téléphone</p>
              <a href="tel:+33200000000" className="underline text-[#432818]/80">
                02 00 00 00 00
              </a>
            </div>
            <div>
              <p className="font-medium text-[#432818]">Email</p>
              <a href="mailto:contact@leboncafe.fr" className="underline text-[#432818]/80">
                contact@leboncafe.fr
              </a>
            </div>
            <div>
              <p className="font-medium text-[#432818]">Horaires</p>
              <ul className="list-disc pl-5">
                <li className="text-[#432818]/80">Lun–Ven : 8h–19h</li>
                <li className="text-[#432818]/80">Sam : 9h–19h</li>
                <li className="text-[#432818]/80">Dim : 9h–13h</li>
              </ul>
            </div>
          </div>

          {/* Carte (placeholder Google Maps) */}
          <div className="mt-6 overflow-hidden rounded-xl">
            <iframe
              title="Carte - Le Bon Café"
              className="h-64 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2749.894!2d-1.553621!3d47.218371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNantes!5e0!3m2!1sfr!2sfr!4v0000000000"
            ></iframe>
          </div>

          {/* Foire aux questions (mini accordéon simple) */}
            <div className="mt-6">
            <h3 className="text-lg font-semibold">FAQ rapide</h3>
            <details className="mt-2 rounded-lg border bg-gray-50 p-3 group transition-transform duration-300 ease-out transform-gpu hover:scale-105 hover:shadow-md hover:bg-[#6F1D1B]">
              <summary className="block cursor-pointer font-medium rounded-md px-2 py-1 transition-colors duration-300 group-hover:text-white">
                Délai de réponse ?
              </summary>
              <p className="mt-2 text-gray-700 transition-colors duration-300 group-hover:text-white">
                Sous 24–48h ouvrées (maquette).
              </p>
            </details>

            <details className="mt-2 rounded-lg border bg-gray-50 p-3 group transition-transform duration-300 ease-out transform-gpu hover:scale-105 hover:shadow-md hover:bg-[#6F1D1B]">
              <summary className="block cursor-pointer font-medium rounded-md px-2 py-1 transition-colors duration-300 group-hover:text-white">
                Commandes entreprises / évènements ?
              </summary>
              <p className="mt-2 text-gray-700 transition-colors duration-300 group-hover:text-white">
                Oui, précisez le nombre de personnes et la date dans le message.
              </p>
            </details>
          </div>
        </section>

        {/* Colonne Formulaire */}
        <section
          aria-labelledby="contact-info-title"
          className="rounded-2xl bg-[#432818]/10 p-6 shadow-lg hover:shadow-xl transition-shadow"
        >
           <h2 id="contact-form-title" className="text-xl font-semibold text-[#432818]">
            Écrivez-nous
          </h2>

          <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
            {/* Nom complet */}
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-[#432818]">
                Nom et prénom *
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                className={`mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring text-[#432818]/80 ${
                  errors.fullname ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="Ex : Amine Lamri"
                value={form.fullname}
                onChange={handleChange}
                aria-invalid={!!errors.fullname}
                aria-describedby={errors.fullname ? "fullname-error" : undefined}
              />
              {errors.fullname && (
                <p id="fullname-error" className="mt-1 text-sm text-red-600">
                  {errors.fullname}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#432818]">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring text-[#432818]/80 ${
                  errors.email ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="vous@example.com"
                value={form.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Téléphone (optionnel) */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[#432818]">
                Téléphone (optionnel)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring text-[#432818]/80"
                placeholder="06 12 34 56 78"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            {/* Sujet */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-[#432818]">
                Sujet
              </label>
              <select
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring text-[#432818]/80"
              >
                <option>Informations</option>
                <option>Réclamation</option>
                <option>Commande entreprise</option>
                <option>Partenariat</option>
                <option>Autre</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#432818]">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className={`mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring text-[#432818]/80 ${
                  errors.message ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="Expliquez-nous votre demande…"
                value={form.message}
                onChange={handleChange}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <p id="message-error" className="mt-1 text-sm text-red-600">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Consentement */}
            <div className="flex items-start gap-3">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                checked={form.consent}
                onChange={handleChange}
                className={`mt-1 h-5 w-5 rounded border ${
                  errors.consent ? "border-red-400" : "border-gray-300"
                }`}
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? "consent-error" : undefined}
              />
              <label htmlFor="consent" className="text-sm text-[#432818]/80">
                J’accepte que Le Bon Café me recontacte au sujet de ma demande.
              </label>
            </div>
            {errors.consent && (
              <p id="consent-error" className="text-sm text-red-600">
                {errors.consent}
              </p>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="rounded-2xl bg-[#6F1D1B] px-5 py-2.5 font-medium text-white focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]/50 focus:ring-offset-2 transition-colors transition-transform duration-200 ease-out hover:scale-105 hover:bg-[#6F1D1B] hover:opacity-95"
              >
                Envoyer
              </button>
              <button
                type="button"
                onClick={() => {
                  setForm({
                    fullname: "",
                    email: "",
                    phone: "",
                    subject: "Informations",
                    message: "",
                    consent: false,
                  });
                  setErrors({});
                  setStatus(null);
                }}
                className="rounded-2xl border border-gray-300 px-5 py-2.5 font-medium transition-colors transition-transform duration-200 ease-out hover:scale-105 hover:bg-[#FFFFFF] hover:text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]/30 focus:ring-offset-2"
              >
                Réinitialiser
              </button>
            </div>

            {/* Note maquette */}
            <p className="text-xs text-gray-500">
              * Champs obligatoires — cette page est une maquette (aucun envoi réel).
            </p>
          </form>
        </section>
      </main>
    </div>
  );
};

export default ContactScreen;