const Terms = () => {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-primary-100">Please read our terms carefully</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">Last updated: {new Date().getFullYear()}</p>
            
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-600">By accessing and using SISFS services, you accept and agree to be bound by the terms and provisions of this agreement.</p>
            
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Services Provided</h2>
            <p className="text-gray-600">SISFS provides solar energy financing, installation, and maintenance services. All services are subject to these terms and applicable agreements.</p>
            
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">User Responsibilities</h2>
            <p className="text-gray-600">Users must provide accurate information, maintain account security, and comply with all applicable laws and regulations.</p>
            
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Payment Terms</h2>
            <p className="text-gray-600">Payment terms vary by service.EMI and financing options are subject to approval. All payments are non-refundable unless otherwise specified.</p>
            
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Warranty and Liability</h2>
            <p className="text-gray-600">Solar panels come with manufacturer warranties. Our installation services are warranted for specified periods. Liability is limited as per the service agreement.</p>
            
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Intellectual Property</h2>
            <p className="text-gray-600">All content, designs, and materials on our platform are owned by SISFS and protected by intellectual property laws.</p>
            
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Termination</h2>
            <p className="text-gray-600">We reserve the right to terminate services for violation of terms or non-payment. Users may terminate with written notice.</p>
            
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-600">For questions about these terms, contact us at info@greenhybridpower.in</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;