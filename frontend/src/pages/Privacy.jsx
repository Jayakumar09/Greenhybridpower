const Privacy = () => {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-primary-100">Your privacy is important to us</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">Last updated: {new Date().getFullYear()}</p>
            
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>
            <p className="text-gray-600">We collect information you provide directly to us, including name, email, phone number, and address when you register, make inquiries, or use our services.</p>
            
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">How We Use Information</h2>
            <p className="text-gray-600">We use the information to provide services, communicate with you, improve our services, and comply with legal obligations.</p>
            
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Information Sharing</h2>
            <p className="text-gray-600">We do not sell your personal information. We may share information with service providers who assist in our operations, and when required by law.</p>
            
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Data Security</h2>
            <p className="text-gray-600">We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Your Rights</h2>
            <p className="text-gray-600">You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.</p>
            
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-600">For privacy concerns, contact us at info@greenhybridpower.in</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;