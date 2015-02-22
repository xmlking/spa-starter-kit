import EmailService from '../../app/experiments/services/EmailService';

//jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

describe('EmailService', function () {
    'use strict';
    let emailService;

    beforeEach(function () {
        emailService = new EmailService();
    });

    it('should send email', function (done) {
        emailService.content = 'email body';
        emailService.send('sumo@demo.com').then( (body) => {
            expect(body).toBe('sending  email body to sumo@demo.com ...');
            done();
        });
    });

    it('should work', function () {
        expect(EmailService.add(1, 2)).toBe(3);
    });

    it('should convert to upper case', function () {
        expect(EmailService.format('sumo')).toBe('SUMO');
    });

    it('should convert default to upper case ANONYMOUS', function () {
        expect(EmailService.format()).toBe('ANONYMOUS');
    });

    it('should fail with invalid arguments', function () {
        expect(() => EmailService.add(1, 'invalid'))
            .toThrowError('Invalid arguments given!\n' +
                '  - 2nd argument has to be an instance of number, got "invalid"');
    });

});


