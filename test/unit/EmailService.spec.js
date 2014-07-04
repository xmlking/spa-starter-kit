import EmailService from '../../app/scripts/experiments/services/EmailService';

describe('EmailService', function () {
    'use strict';
    let emailService;

    beforeEach(function () {
        emailService = new EmailService();
    });

    it('should work', function () {
        expect(EmailService.add(1, 2)).toBe(3);
    });

    it('should convert to upper case', function () {
        expect(EmailService.format('sumo')).toBe('SUMO');
    });

    it('should convert default to upper case', function () {
        expect(EmailService.format()).toBe('ANONYMOUS');
    });

    xit('should fail', function () {
        EmailService.add(1, 'invalid');
    });
});
