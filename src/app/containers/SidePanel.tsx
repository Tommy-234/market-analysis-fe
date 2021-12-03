import { Accordion, Card } from 'react-bootstrap';
import { StreamForm, IndicatorForm, NotificationForm } from './forms';
import 'bootstrap/dist/css/bootstrap.min.css';

export const SidePanel = () => {
  return (
    <div className = "container w-50 mt-2">
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Add Stream
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <StreamForm />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            Add Indicator
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <IndicatorForm />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="2">
            Add Notification
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <NotificationForm />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  )
}
