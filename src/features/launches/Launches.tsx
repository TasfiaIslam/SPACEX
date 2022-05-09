import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getLaunches, selectLaunches } from './launchSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

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
                <Card className="text-white bg-dark">
                  <Card.Header className="font-weight-bold text-danger fs-6">
                    Flight no: {launch?.flight_number}
                  </Card.Header>
                  <Card.Body className="py-2">
                    <Card.Img variant="top" src={launch?.links?.mission_patch} />

                    <Card.Title className="font-weight-bold mt-2 text-warning">
                      {launch?.mission_name}
                    </Card.Title>
                    <Card.Text className="fs-6 font-weight-light">
                      <p className="" style={{ height: '80px' }}>
                        {launch?.details?.length < DESCRIPTION_LIMIT
                          ? launch?.details
                          : `${launch?.details?.substring(0, DESCRIPTION_LIMIT)} ...`}
                      </p>
                      <p className="text-danger">Launched At {launch?.launch_year}</p>
                      <Col className="pb-4">
                        <span className=" text-warning">Rocket: </span>
                        <span className=" text-warning">
                          {launch?.rocket?.rocket_name}-{launch?.rocket?.rocket_type}
                        </span>
                      </Col>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Row>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Launches;
