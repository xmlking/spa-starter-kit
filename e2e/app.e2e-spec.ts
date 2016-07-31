import { SpaPage } from './app.po';

describe('SPA App', function() {
  let page: SpaPage;

  beforeEach(() => {
    page = new SpaPage();
  });

  it('should display message saying SPA Starter Kit', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('SPA Starter Kit');
  });
});
