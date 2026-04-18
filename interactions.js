/**
 * Portfolio interactions — prototype contact flow (no backend).
 * Client-side validation (including email format) and simulated success feedback.
 */
(function () {
    'use strict';

    var NAME_MIN = 2;
    var NAME_MAX = 120;
    var MSG_MIN = 10;
    var MSG_MAX = 8000;

    function trim(s) {
        return (s || '').replace(/^\s+|\s+$/g, '');
    }

    /** Practical email format check (client-side only). */
    function isValidEmail(value) {
        var s = trim(value);
        if (!s || s.length > 254) return false;
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(s);
    }

    function clearFieldErrors() {
        ['contactName', 'contactEmail', 'contactMessage', 'contactTopic'].forEach(function (id) {
            var el = document.getElementById(id);
            if (!el) return;
            el.classList.remove('is-field-invalid');
            el.removeAttribute('aria-invalid');
        });
    }

    function markInvalid(el) {
        if (!el) return;
        el.classList.add('is-field-invalid');
        el.setAttribute('aria-invalid', 'true');
    }

    /**
     * @returns {{ ok: true, name: string, email: string, topic: string, message: string } | { ok: false, message: string, focusId: string }}
     */
    function validateContactForm() {
        var nameEl = document.getElementById('contactName');
        var emailEl = document.getElementById('contactEmail');
        var messageEl = document.getElementById('contactMessage');
        var topicEl = document.getElementById('contactTopic');

        var name = trim(nameEl && nameEl.value);
        var email = trim(emailEl && emailEl.value);
        var message = trim(messageEl && messageEl.value);
        var topic = topicEl ? trim(topicEl.value) || topicEl.options[topicEl.selectedIndex].text : '';

        if (!nameEl || !emailEl || !messageEl) {
            return { ok: false, message: 'Form is not ready.', focusId: 'contactName' };
        }

        if (name.length < NAME_MIN) {
            return {
                ok: false,
                message: 'Please enter your name (at least ' + NAME_MIN + ' characters).',
                focusId: 'contactName'
            };
        }
        if (name.length > NAME_MAX) {
            return {
                ok: false,
                message: 'Please shorten your name (max ' + NAME_MAX + ' characters).',
                focusId: 'contactName'
            };
        }

        if (!email) {
            return { ok: false, message: 'Please enter your email address.', focusId: 'contactEmail' };
        }
        if (!isValidEmail(email)) {
            return {
                ok: false,
                message: 'Please enter a valid email address (for example: name@example.com).',
                focusId: 'contactEmail'
            };
        }

        if (message.length < MSG_MIN) {
            return {
                ok: false,
                message: 'Please enter a longer message (at least ' + MSG_MIN + ' characters) so your inquiry is clear.',
                focusId: 'contactMessage'
            };
        }
        if (message.length > MSG_MAX) {
            return {
                ok: false,
                message: 'Please shorten your message (max ' + MSG_MAX + ' characters).',
                focusId: 'contactMessage'
            };
        }

        return { ok: true, name: name, email: email, topic: topic, message: message };
    }

    function showStatus(statusEl, text, variant) {
        statusEl.textContent = '';
        statusEl.innerHTML = '';
        statusEl.hidden = false;
        statusEl.classList.add('is-visible');
        statusEl.classList.remove('contact-form-status--success', 'contact-form-status--error');
        statusEl.classList.add(variant === 'error' ? 'contact-form-status--error' : 'contact-form-status--success');
        if (variant === 'error') {
            statusEl.textContent = text;
            return;
        }
        var title = document.createElement('span');
        title.className = 'contact-form-status__title';
        title.textContent = 'Submission Successful';
        statusEl.appendChild(title);
        if (trim(text)) {
            var detail = document.createElement('span');
            detail.className = 'contact-form-status__detail';
            detail.textContent = text;
            statusEl.appendChild(detail);
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        var form = document.getElementById('contactForm');
        var statusEl = document.getElementById('contactFormStatus');
        if (!form || !statusEl) return;

        var hideTimer = null;

        function clearStatusLater() {
            if (hideTimer) window.clearTimeout(hideTimer);
            hideTimer = window.setTimeout(function () {
                statusEl.classList.remove('is-visible', 'contact-form-status--success', 'contact-form-status--error');
                statusEl.hidden = true;
                statusEl.textContent = '';
                statusEl.innerHTML = '';
                hideTimer = null;
            }, 7000);
        }

        function validateEmailFieldOnly() {
            var emailEl = document.getElementById('contactEmail');
            if (!emailEl) return;
            var v = trim(emailEl.value);
            emailEl.classList.remove('is-field-invalid');
            emailEl.removeAttribute('aria-invalid');
            if (v.length === 0) return;
            if (!isValidEmail(v)) {
                markInvalid(emailEl);
            }
        }

        var emailEl = document.getElementById('contactEmail');
        if (emailEl) {
            emailEl.addEventListener('blur', validateEmailFieldOnly);
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (hideTimer) {
                window.clearTimeout(hideTimer);
                hideTimer = null;
            }

            clearFieldErrors();

            var result = validateContactForm();
            if (!result.ok) {
                showStatus(statusEl, result.message, 'error');
                var focusEl = document.getElementById(result.focusId);
                if (focusEl) {
                    markInvalid(focusEl);
                    focusEl.focus();
                }
                clearStatusLater();
                return;
            }

            showStatus(statusEl, '', 'success');
            form.reset();
            clearFieldErrors();
            clearStatusLater();
        });
    });
})();
