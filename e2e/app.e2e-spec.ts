import { GideonLabsPage } from './app.po';

describe('gideon-labs App', function() {
  let page: GideonLabsPage;

  beforeEach(() => {
    page = new GideonLabsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
