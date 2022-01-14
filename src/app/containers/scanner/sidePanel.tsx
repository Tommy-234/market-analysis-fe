import { Accordion, Card } from 'react-bootstrap';
import { AddColumnForm, ScannerFilterForm } from './forms';
import 'bootstrap/dist/css/bootstrap.min.css';

export const SidePanel = () => {
  return (
    <div className = "container w-50 mt-2">
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            Filters
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <ScannerFilterForm />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Add Column
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <AddColumnForm />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  )
}
