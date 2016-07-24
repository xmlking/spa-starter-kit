import { SpaPage } from './app.po';

describe('SPA App', function() {
  let page: SpaPage;

  beforeEach(() => {
    page = new SpaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
