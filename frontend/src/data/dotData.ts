// dummy dot data
// TODO: Will be replaced with data from `GptComponent`
// TODO: Remove file before production

export const dotData = `
  # http://www.graphviz.org/content/cluster

  digraph FlaskStructure {

    node [shape=box, style="rounded,filled", fontname="Helvetica", fontsize=10]
    edge [fontname="Helvetica", fontsize=8, fontcolor=gray30]

    // Flask Core Module
    subgraph cluster_flask_core {
        label="Flask Core"
        style=filled
        color=lightblue
        node [color=white]

        Core_App [label="App (Handles request routing, configuration, and context management)"]
        Core_CLI [label="CLI (Provides command-line interface for application management)"]
        Core_Sessions [label="Sessions (Manages user session data across requests)"]
        Core_Logging [label="Logging (Facilitates application event logging)"]
        Core_Config [label="Config (Manages application configuration settings)"]

        Core_App -> Core_CLI [label="Initializes CLI commands for app management"]
        Core_App -> Core_Sessions [label="Links sessions to request context for state management"]
        Core_App -> Core_Logging [label="Logs app events for debugging and auditing"]
        Core_App -> Core_Config [label="Applies configuration settings to the app context"]
    }

    // Flask Testing Module
    subgraph cluster_flask_testing {
        label="Flask Testing"
        style=filled
        color=lightgreen
        node [color=white]

        Test_Logging [label="Test Logging (Validates logging mechanisms)"]
        Test_CLI [label="Test CLI (Tests command-line interface functionality)"]
        Test_Apps [label="Test Apps (Simulates real-world application scenarios for testing)"]

        Test_Logging -> Core_Logging [label="Tests logging output and handlers"]
        Test_CLI -> Core_CLI [label="Validates command execution and app context integration"]
        Test_Apps -> Core_App [label="Simulates real-world application flows for end-to-end testing"]
    }

    // Flask Submodule (Sansio)
    subgraph cluster_flask_sansio {
        label="Sansio"
        style=filled
        color=lightyellow
        node [color=white]

        Sansio_Blueprints [label="Blueprints (Manages modular app routes and templates)"]
        Sansio_App [label="App (Provides minimal app framework without HTTP context)"]
        Sansio_Scaffold [label="Scaffold (Offers utilities for building the app structure)"]

        Sansio_App -> Sansio_Blueprints [label="Integrates blueprints into the application structure"]
        Sansio_Scaffold -> Sansio_App [label="Scaffolds the app with initial settings and structure"]
    }

    // Inter-module relationships
    Core_App -> Sansio_App [label="Uses Sansio as lightweight core for non-HTTP functionalities"]
    Sansio_Blueprints -> Test_Apps [label="Blueprint integration tested through real-world scenarios"]
    Test_Apps -> Core_App [label="Verifies app behavior under real-world conditions"]

    // External dependencies
    External_Database [label="Database", shape=ellipse, style=dashed]
    External_HTTPServer [label="HTTP Server", shape=ellipse, style=dashed]

    Core_App -> External_HTTPServer [label="Serves HTTP requests via external server", style=dashed]
    Core_Sessions -> External_Database [label="Stores session data externally", style=dashed]
}
`