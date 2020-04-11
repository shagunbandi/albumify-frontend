import React from 'react';

function Footer() {
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="footer p-3 mt-4 text-center bg-lght text-dark">
            Developed By:
            <span className="text-warning font-weight-normal">
              &nbsp;Shagun Bandi
            </span>
            , Using <i className="fab fa-react" /> React JS &amp; Redux JS
            , Works With Django Server accessing your photos
        </div>
        </div>
      </div>
    </div >
  );
}

export default Footer;
