import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getLaunches, selectLaunches, getLaunchesByRocket } from './launchSlice';
import Launch from './launch';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';
import './launches.style.css';

const Launches = (): JSX.Element => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const [term, setTerm] = useState('');
  const [spacexData, setSpaceXData] = useState([]);
  const launchesData = useAppSelector(selectLaunches);
  const dispatch = useAppDispatch();

  const launches = launchesData?.list;
  const launchesByRocket = launchesData?.listByName;

  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(spacexData?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(spacexData?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % spacexData?.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    dispatch(getLaunches());
    setSpaceXData(launches);
  }, [dispatch, term]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getLaunchesByRocket(term));
    console.log(term);
    setSpaceXData(launchesByRocket);
    setTerm('');
  };

  const handleChange = (e) => {
    let searchTerm = e.target.value.trim().replaceAll(' ', '+');
    searchTerm = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1);
    setTerm(searchTerm);
  };

  return (
    <div>
      <h2 className="py-4">Launches</h2>

      <Container fluid>
        <Row>
          <Col></Col>
          <Form className="w-25 form-inline" style={{ display: 'flex' }} onSubmit={handleSubmit}>
            <Form.Control placeholder="Search by rocket name" onChange={handleChange} />
            <button type="submit" className="btn btn-warning">
              <svg width="15px" height="15px">
                <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
              </svg>
            </button>
          </Form>
        </Row>

        <Row>
          {currentItems?.map((launch, index) => (
            <Col className="col-12 col-sm-6 col-md-4 col-xl-3 gx-5" key={index}>
              <Row className="my-4">
                <Launch
                  flight_number={launch?.flight_number}
                  mission_patch_img={launch?.links?.mission_patch}
                  mission_name={launch?.mission_name}
                  details={launch?.details}
                  launch_year={launch?.launch_year}
                  rocket_name={launch?.rocket?.rocket_name}
                  rocket_type={launch?.rocket?.rocket_type}
                />
              </Row>
            </Col>
          ))}
        </Row>

        <div className="d-flex align-items-center">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </div>
      </Container>
    </div>
  );
};

export default Launches;
