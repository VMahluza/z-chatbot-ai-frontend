/**
 * Represents the lifecycle phases of a WebSocket connection within the chat application.
 *
 * This enum adds semantic clarity beyond the native `WebSocket.readyState` numeric values,
 * supporting richer UI states (e.g. differentiating `Reconnecting` vs initial `Connecting`)
 * and error-handling flows.
 *
 * States:
 * - Idle: No connection attempt has been made yet.
 * - Connecting: An initial connection attempt is in progress.
 * - Open: The WebSocket connection is established and ready for messaging.
 * - Reconnecting: A previously open connection failed and a backoff retry cycle is underway.
 * - Closing: A graceful, intentional close handshake has been initiated.
 * - Closed: The connection is fully closed as expected (no immediate retry pending).
 * - Error: A terminal or unexpected error occurred (often followed by transition to Reconnecting).
 *
 * Typical transitions:
 *   Idle -> Connecting -> Open -> Closing -> Closed
 *   Open -> Error -> Reconnecting -> Open
 *   Open -> Error -> Reconnecting -> Error (if retries exhausted)
 *
 * @remarks
 * Use this enum for UI rendering, logging, telemetry, and retry orchestration rather than relying
 * directly on the numeric `readyState` values.
 *
 * @example Basic state handling
 * ```ts
 * function renderStatus(status: WsConnectStatus) {
 *   switch (status) {
 *     case WsConnectStatus.Open:
 *       return 'Connected';
 *     case WsConnectStatus.Reconnecting:
 *       return 'Reconnecting...';
 *     case WsConnectStatus.Error:
 *       return 'Connection error';
 *     default:
 *       return status;
 *   }
 * }
 * ```
 *
 * @example Distinguishing initial vs subsequent attempts
 * ```ts
 * if (status === WsConnectStatus.Connecting && lastStatus === WsConnectStatus.Idle) {
 *   console.log('Initial connect attempt started');
 * } else if (status === WsConnectStatus.Connecting && lastStatus === WsConnectStatus.Reconnecting) {
 *   console.log('Retry attempt in progress');
 * }
 * ```
 */

/**
 * Maps the native `WebSocket.readyState` numeric value (0–3) into a richer
 * {@link WsConnectStatus}. Unexpected numeric values map to `WsConnectStatus.Error`.
 *
 * Mapping:
 * - 0 -> Connecting
 * - 1 -> Open
 * - 2 -> Closing
 * - 3 -> Closed
 *
 * @param readyState - The numeric `readyState` from a `WebSocket` instance.
 * @returns The corresponding {@link WsConnectStatus} enum value.
 *
 * @example
 * ```ts
 * const ws = new WebSocket(url);
 * ws.addEventListener('open', () => {
 *   const status = mapReadyState(ws.readyState); // -> WsConnectStatus.Open
 * });
 * ```
 *
 * @example Handling unknown values defensively
 * ```ts
 * const status = mapReadyState(suspectValue);
 * if (status === WsConnectStatus.Error) {
 *   // Log anomaly or trigger diagnostics
 * }
 * ```
 */

/**
 * Template-literal string union type of all possible {@link WsConnectStatus} values.
 *
 * Useful when you need a string type (e.g. serialization, JSON schema alignment, form values)
 * but still want strong typing tied to the enum's value set.
 *
 * @example
 * ```ts
 * function persistStatus(status: WsConnectStatusType) {
 *   localStorage.setItem('wsStatus', status);
 * }
 * ```
 *
 * @example Narrowing from persisted data
 * ```ts
 * const raw = localStorage.getItem('wsStatus');
 * if (raw && Object.values(WsConnectStatus).includes(raw as WsConnectStatus)) {
 *   const status: WsConnectStatusType = raw as WsConnectStatusType;
 *   // safe to use
 * }
 * ```
 */



export enum WsConnectStatus {
    Idle = 'idle',             // Not yet attempted
    Connecting = 'connecting', // Attempt in progress
    Open = 'open',             // Connected and usable
    Reconnecting = 'reconnecting', // Backoff retry in progress
    Closing = 'closing',       // Graceful close initiated
    Closed = 'closed',         // Fully closed (expected)
    Error = 'error',           // Terminal error state (will usually precede a reconnect)
}

/**
 * Optional helper to map native WebSocket readyState numbers to WsConnectStatus.
 */
export function mapReadyState(readyState: number): WsConnectStatus {
    switch (readyState) {
        case 0: return WsConnectStatus.Connecting;
        case 1: return WsConnectStatus.Open;
        case 2: return WsConnectStatus.Closing;
        case 3: return WsConnectStatus.Closed;
        default: return WsConnectStatus.Error;
    }
}

export type WsConnectStatusType = `${WsConnectStatus}`;