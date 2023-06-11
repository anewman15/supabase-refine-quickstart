import Layout from '~/layouts/DefaultGuideLayout'
import StepHikeCompact from '~/components/StepHikeCompact'

export const meta = {
  title: 'Use Supabase with **refine**',
  subtitle:
    'Learn how to create a Supabase project, add some sample data to your database, and query the data from a **refine** app.',
  breadcrumb: 'Framework Quickstarts',
}

<StepHikeCompact>

  <StepHikeCompact.Step step={1}>
    <StepHikeCompact.Details title="Set up a Supabase project with sample data">

    [Create a new project](https://app.supabase.com) in the Supabase Dashboard.

    After your project is ready, create a table in your Supabase database using the [SQL Editor](https://app.supabase.com/project/_/sql) in the Dashboard. Use the following SQL statement to create a `countries` table with some sample data.

    </StepHikeCompact.Details>

    <StepHikeCompact.Code>

     ```sql SQL_EDITOR
      -- Create the table
      CREATE TABLE countries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
      -- Insert some sample data into the table
      INSERT INTO countries (name) VALUES ('United States');
      INSERT INTO countries (name) VALUES ('Canada');
      INSERT INTO countries (name) VALUES ('Mexico');
      ````

    </StepHikeCompact.Code>

  </StepHikeCompact.Step>

  <StepHikeCompact.Step step={2}>

    <StepHikeCompact.Details title="Create a refine app">

    Create a **refine** app using the [refine CLI](hhttps://refine.dev/docs/packages/documentation/cli/).

    The `refine-supabase` preset adds `@refinedev/supabase` supplementary package that supports **Supabase** in a **refine** app. `@refinedev/supabase` out-of-the-box includes the **Supabase** dependency: [supabase-js](https://github.com/supabase/supabase-js).
    
    </StepHikeCompact.Details>

    <StepHikeCompact.Code>

      ```bash Terminal
      npm create refine-app@latest -- --preset refine-supabase my-app
      ```

    </StepHikeCompact.Code>

  </StepHikeCompact.Step>

  <StepHikeCompact.Step step={3}>
    <StepHikeCompact.Details title="Open your refine app in VS Code">

    You will develop your app, connect to the **Supabase** backend and run the **refine** app in VS Code.

    </StepHikeCompact.Details>

    <StepHikeCompact.Code>

      ```bash Terminal
      cd my-app
      code .
      ```

    </StepHikeCompact.Code>

  </StepHikeCompact.Step>

  <StepHikeCompact.Step step={4}>
    <StepHikeCompact.Details title="Configure Environmental Variables">

    In your `.env` file, add the Project URL as `SUPABASE_URL` and API `anon` Key as `SUPABASE_KEY`.

    </StepHikeCompact.Details>
    <StepHikeCompact.Code>

      ```bash Terminal
          SUPABASE_URL=YOUR_SUPABASE_URL
          SUPABASE_KEY=SUPABASE_KEY
      ```

    </StepHikeCompact.Code>

  </StepHikeCompact.Step>

  <StepHikeCompact.Step step={5}>
    <StepHikeCompact.Details title="Start the app">

    Start the app, go to http://localhost:5173 in a browser, and you should be greeted with the **refine** Welcome page.

    </StepHikeCompact.Details>

    <StepHikeCompact.Code>

      ```bash Terminal
      npm run dev
      ```

    </StepHikeCompact.Code>

    ![refine-welcome-page](https://imgbox.com/KsXgke1T)
    
  </StepHikeCompact.Step>
</StepHikeCompact>


  <StepHikeCompact.Step step={6}>
    <StepHikeCompact.Details title="Update `supabaseClient`">

      You now have to update the `supabaseClient` with your stored **Supabase** credentials in `.env` file. The `supabaseClient` is used in auth provider and data provider methods that allow the **refine** app to connect to your **Supabase** backend.

    </StepHikeCompact.Details>

    <StepHikeCompact.Code>

      ```ts src/utility/supabaseClient.ts
      import { createClient } from "@refinedev/supabase";

      const SUPABASE_URL = process.env.SUPABASE_URL;
      const SUPABASE_KEY = process.env.SUPABASE_KEY

      export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
        db: {
          schema: "public",
        },
        auth: {
          persistSession: true,
        },
      });
      ```

    </StepHikeCompact.Code>    
  </StepHikeCompact.Step>
  
  <StepHikeCompact.Step step={7}>
    <StepHikeCompact.Details title="Add resources">

      You have to then configure the resources and their routes in the `App.tsx` file. In **refine** resources are passed as prop to `<Refine />` and routes are added as children.

      We have a `countries` resource so you need to define a `list` action for it along with a corresponding route path. You should also disable / remove the `authProvider` prop of `<Refine />` because this app doesn't require authentication.

    </StepHikeCompact.Details>

    <StepHikeCompact.Code>

      ```ts src/App.tsx
      import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
      import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

      import routerBindings, {
        DocumentTitleHandler,
        NavigateToResource,
        UnsavedChangesNotifier,
      } from "@refinedev/react-router-v6";
      import { dataProvider, liveProvider } from "@refinedev/supabase";
      import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
      import "./App.css";
      import authProvider from "./authProvider";
      import { supabaseClient } from "./utility";
      import { CountriesList } from "./list";

      function App() {
        return (
          <BrowserRouter>
            <GitHubBanner />
            <RefineKbarProvider>
              <Refine
                dataProvider={dataProvider(supabaseClient)}
                liveProvider={liveProvider(supabaseClient)}
                // authProvider={authProvider}
                routerProvider={routerBindings}
                resources={[
                  {
                    name: "countries",
                    list: "/countries",
                  }
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                }}
              >
                <Routes>
                  <Route index
                    element={<NavigateToResource resource="countries" />} 
                  />
                  <Route path="/countries">
                    <Route index element={<CountriesList />} />
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
            </RefineKbarProvider>
          </BrowserRouter>
        );
      }

      export default App;
      ```

    </StepHikeCompact.Code>    
  </StepHikeCompact.Step>

  <StepHikeCompact.Step step={8}>
    <StepHikeCompact.Details title="Add countries `list` page">

      Create the page for `list` view to fetch and display `countries` data.
      
      In these couple of lines, we are using the **Inferencer** to automatically generate code for the `list` page. The `<HeadlessInferencer />` component generates code for the page that uses `useTable()` hook to fetch and display `countries` data from **Supabase** in a table.
      
      You need to install `@refinedev/react-table`and `@refinedev/react-hook-form` packages. So run:

      ```bash Terminal
      npm install @refinedev/react-hook-form @refinedev/react-table
      ```

      More on [how the **Inferencer** works is available in the docs here](https://refine.dev/docs/packages/documentation/inferencer/).

    </StepHikeCompact.Details>

    <StepHikeCompact.Code>

      ```ts src/pages/countries/list.tsx
      import { HeadlessInferencer } from "@refinedev/inferencer/headless";

      export const CountriesList = () => <HeadlessInferencer />;
      ```

    </StepHikeCompact.Code>    
  </StepHikeCompact.Step>
  
  <StepHikeCompact.Step step={9}>
    <StepHikeCompact.Details title="View countries page">

      Now you should be able to see the countries `list` page on the `/countries` route.

      The Inferencer generated code gives you a good starting point on which to keep building your `list` page. It can be obtained by clicking the `Show the auto generated code` button.
      
      ![refine-countries-list](https://imgbox.com/fRpQlmbS)

  </StepHikeCompact.Step>
</StepHikeCompact>

export const Page = ({ children }) => <Layout meta={meta} children={children} hideToc={true} />

export default Page
