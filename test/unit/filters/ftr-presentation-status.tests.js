'use strict';
describe('filter: status', function() {
  beforeEach(module('risevision.schedulesApp.filters'));
  var presentationStatus;
  beforeEach(function(){
    inject(function($filter){
      presentationStatus = $filter('presentationStatus');
    });
  });

  it('should exist',function(){
    expect(presentationStatus).to.be.truely;
  });

  it('should default to N/A if revisionStatus is null',function(){
    expect(presentationStatus()).to.equal('N/A');
  });

  it('should default to N/A if revisionStatus is empty',function(){
    expect(presentationStatus("")).to.equal('N/A');
  });

  it('should return Published string if revisionStatus is 0',function(){
    var revisionStatus = 0;
    var expectation = "Published";
    expect(presentationStatus(revisionStatus)).to.equal(expectation);
  });

  it('should return Revised string if revisionStatus is 1',function(){
    var revisionStatus = 1;
    var expectation = "Revised";
    expect(presentationStatus(revisionStatus)).to.equal(expectation);
  });

});
