import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getLaunches, selectLaunches } from './launchSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import Launch from './launch';

const Launches = (): JSX.Element => {
  const DESCRIPTION_LIMIT = 80;
  const launchesData = useAppSelector(selectLaunches);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getLaunches());
  }, [dispatch]);
  console.log('DATA', launchesData.list[0]);

  const launches = launchesData?.list?.filter((item) => item.flight_number <= 5);

  return (
    <div>
      <h2>Launches</h2>
      <Container fluid>
        <Row>
          {launches?.map((launch, index) => (
            <Col className="col-12 col-sm-6 col-md-4 col-xl-3 gx-5" key={index}>
              <Row className="my-4">
                <Launch
                  flight_number={launch?.flight_number}
                  mission_patch_img={launch?.mission_patch}
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
      </Container>
    </div>
  );
};

export default Launches;
