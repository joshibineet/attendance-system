'use client';

import Selector from '@/core/ui/components/Selector';
import { TextField } from '@/core/ui/karma/src/components';
import Buttons from '@/core/ui/karma/src/components/Buttons';
import FormCards from '@/core/ui/karma/src/components/Form/FormCard';
import FormGroups from '@/core/ui/karma/src/components/Form/FormGroup';

export default function TicketCreatePage() {
  return (
    <>
      <FormCards className="m-4">
        <FormGroups title="Ticket Information">
          <div className="flex flex-col mb-2">
            <TextField
              id="title"
              type="text"
              label="Subject"
              className="flex-1"
              required
            />
          </div>
          <div className="flex flex-col mb-2">
            <TextField
              id="description"
              type="text"
              label="Description"
              className="flex-1 mb-2"
              isMulti
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mb-2">
            <Selector
              id="flight_selector"
              options={[]}
              label="Flight"
              placeholder="Select or create flight"
              className="flex-1 mb-2"
              name="flight"
            />

            <Selector
              id="station_selector"
              options={[]}
              label="Station"
              placeholder="Select or create station"
              className="flex-1 mb-2"
              name="station"
            ></Selector>
          </div>
          <div className="flex flex-col mb-2">
            <Selector
              id="source_selector"
              options={[]}
              label="Sources"
              isMulti
              placeholder="Select sources"
              className="flex-1"
              name="sources"
            />
          </div>
        </FormGroups>
        <FormGroups title="States">
          <div className="flex flex-col sm:flex-row gap-2 mb-2">
            <Selector
              id="severity_selector"
              options={[]}
              label="Severity"
              placeholder="Select or create severity"
              className="flex-1 mb-2"
              name="severity"
            ></Selector>
            <Selector
              id="status_selector"
              options={[]}
              label="Status"
              placeholder="Select or create status"
              className="flex-1 mb-2"
              name="status"
            ></Selector>
            <Selector
              id="station_selector"
              options={[]}
              label="Station"
              placeholder="Select or create station"
              className="flex-1 mb-2"
              name="station"
            ></Selector>
          </div>
        </FormGroups>
        <FormGroups title="Participants">
          <div className="flex flex-col sm:flex-row gap-2 mb-2">
            <Selector
              id="ticket_owner_selector"
              options={[]}
              label="Ticket Owner"
              placeholder="Select or create ticket owner"
              className="flex-1 mb-2"
              name="owner"
            ></Selector>
            <Selector
              id="witness_selector"
              options={[]}
              label="Witness"
              placeholder="Select or create witness"
              className="flex-1 mb-2"
              name="witness"
            ></Selector>
          </div>
          <Selector
            id="assignee_selector"
            options={[]}
            label="Assignee"
            placeholder="Select or create assignee"
            className="flex-1 mb-2"
            name="assignee"
          ></Selector>
        </FormGroups>
        <div className="flex justify-end gap-2 m-4">
          <Buttons text="Submit" className="h-8 w-fit" type="submit" />
          <Buttons text="Cancel" className="h-8 w-fit" buttonType="bordered" />
        </div>
      </FormCards>
    </>
  );
}
