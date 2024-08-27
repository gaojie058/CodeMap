// dummy dot data
// TODO: Will be replaced with data from `GptComponent`
// TODO: Remove file before production

export const dotData = `
//   digraph FunctionCallFlow {
//     rankdir=TB;
//     node [shape=box];
//     edge [];

//     // Main functions
//     dispatch_request;
//     full_dispatch_request;
//     finalize_request;
//     make_default_options_response;
//     preprocess_request;
//     process_response;
//     do_teardown_request;
//     add_url_rule;

//     // Secondary functions
//     handle_user_exception;
//     raise_routing_exception;
//     view_functions;
//     make_response;
//     ensure_sync;
//     before_request_funcs;
//     template_context_processors;
//     url_value_preprocessors;
//     after_request_funcs;
//     teardown_request_funcs;

//     // Relationships
//     dispatch_request -> make_default_options_response;
//     dispatch_request -> view_functions;
//     dispatch_request -> ensure_sync;

//     full_dispatch_request -> dispatch_request;
//     full_dispatch_request -> preprocess_request;
//     full_dispatch_request -> handle_user_exception;
//     full_dispatch_request -> finalize_request;

//     finalize_request -> make_response;
//     finalize_request -> process_response;

//     preprocess_request -> url_value_preprocessors;
//     preprocess_request -> before_request_funcs;

//     process_response -> after_request_funcs;
//     process_response -> save_session;

//     do_teardown_request -> teardown_request_funcs;

//     add_url_rule -> view_functions;

//     // Subgraph for full_dispatch_request
//     subgraph cluster_full_dispatch_request {
//         label = "full_dispatch_request flow";
//         node [shape=box];
//         preprocess_request -> dispatch_request -> handle_user_exception;
//     }

//     // Subgraph for process_response
//     subgraph cluster_process_response {
//         label = "process_response flow";
//         node [shape=box];
//         after_request_funcs -> save_session;
//     }

//     // Subgraph for preprocess_request
//     subgraph cluster_preprocess_request {
//         label = "preprocess_request flow";
//         node [shape=box];
//         url_value_preprocessors -> before_request_funcs;
//     }

//     // Notes
//     note1 [shape=note, label="Ensure functions are handling respective request contexts"];
//     note2 [shape=note, label="Handle exceptions in dispatch request"];
//     note3 [shape=note, label="Save session data during process_response"];

//     dispatch_request -> note2 [style=dotted];
//     process_response -> note3 [style=dotted];
//     ensure_sync -> note1 [style=dotted];
// }


`