import { ELSTemplatePage } from './app.po';

describe('ELS App', function() {
  let page: ELSTemplatePage;

  beforeEach(() => {
    page = new ELSTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
